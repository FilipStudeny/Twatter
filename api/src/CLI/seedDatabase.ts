/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import "reflect-metadata";
import ReactionType from "@Models/Enums/ReactionType";
import ReportType from "@Models/Enums/ReportType";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";
import { config as dotenvConfig } from "dotenv";
import { createConnection, Connection } from "typeorm";

import { AdminNotification } from "../Models/Administration/AdministrationNotification";
import { Administrator } from "../Models/Administration/Administrator";
import { BanStrike } from "../Models/Administration/BanStrike";
import { Comment } from "../Models/Comment";
import AdminRole from "../Models/Enums/AdminRole";
import { Group } from "../Models/Group";
import { Interest } from "../Models/Interest";
import { Notification } from "../Models/Notification";
import { Password } from "../Models/Password";
import { Post } from "../Models/Post";
import { Reaction } from "../Models/Reaction";
import { Report } from "../Models/Report";
import { User } from "../Models/User";
import { UserConfiguration } from "../Models/UserConfiguration";

// Load environment variables from .env
dotenvConfig();

/**
 * Establishes a connection to the database.
 */
async function connectToDatabase(): Promise<Connection> {
	return createConnection({
		type: "postgres",
		host: process.env.DB_HOST || "localhost",
		port: parseInt(process.env.DB_PORT || "5432", 10),
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "root",
		database: process.env.DB_DATABASE || "twatter",
		synchronize: true,
		logging: true, // Enable SQL query logging
		entities: [
			Comment,
			Group,
			Interest,
			Notification,
			Password,
			Post,
			Reaction,
			Report,
			User,
			AdminNotification,
			Administrator,
			BanStrike,
			UserConfiguration,
		],
	});
}

/**
 * Truncates all data from the database in sequence to avoid deadlocks.
 */
async function truncateTables(connection: Connection): Promise<void> {
	const entities = connection.entityMetadatas;

	// Use sequential truncation instead of parallel
	for (const entity of entities) {
		const repository = connection.getRepository(entity.name);
		await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
	}

	console.log("All tables have been truncated.");
}
/**
 * Generates a hashed password using bcrypt.
 * @param plainPassword The plain text password to hash.
 */
async function generateHashedPassword(plainPassword: string): Promise<{ hashedPassword: string; salt: string }> {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(plainPassword, salt);
	return { hashedPassword, salt };
}

/**
 * Seeds 5 administrators with different roles into the "administrator" table.
 * @param connection The database connection.
 * @param password The hashed password to assign to all administrators.
 */
async function seedAdministrators(connection: Connection, password: string): Promise<void> {
	const adminRoles = [AdminRole.MODERATOR, AdminRole.SUPERVISOR, AdminRole.ADMINISTRATOR];
	const administrators = [];

	// Generate 5 administrators with unique roles
	for (let i = 0; i < 5; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const email = faker.internet.email();
		const username = faker.internet.userName();
		const adminRole = adminRoles[i % adminRoles.length]; // Rotate through the roles

		const { hashedPassword, salt } = await generateHashedPassword(password);
		const passwordEntity = new Password();
		passwordEntity.hash = hashedPassword;
		passwordEntity.salt = salt;

		const administrator = new Administrator();
		administrator.firstName = firstName;
		administrator.lastName = lastName;
		administrator.email = email;
		administrator.username = username;
		administrator.adminRole = adminRole;
		administrator.password = passwordEntity;

		administrators.push(administrator);
	}

	await connection.manager.save(administrators);
	console.log("Administrators have been inserted into the database.");
}

/**
 * Seeds predefined interests into the "interest" table.
 * @param connection The database connection.
 */
async function seedInterests(connection: Connection): Promise<Interest[]> {
	const interests = ["Tech", "Cars", "Vacation", "Food", "Latest", "News", "NSFW"];
	const interestPromises = interests.map((interest) =>
		connection.manager.save(Interest, { name: interest, color: faker.color.rgb() }),
	);
	const interestEntities = await Promise.all(interestPromises);
	console.log("Interests have been inserted into the database.");
	return interestEntities;
}

/**
 * Seeds users into the "user" table with random data and assigns mutual friends.
 * @param connection The database connection.
 * @param password A plaintext password used to seed user.password.
 */
export async function seedUsers(connection: Connection, password: string): Promise<User[]> {
	// 1) Create 10 new users with random data
	const users = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const email = faker.internet.email();
			const username = faker.internet.userName();
			const profilePictureUrl = faker.image.avatarGitHub();

			// Generate a hashed password
			const { hashedPassword, salt } = await generateHashedPassword(password);
			const passwordEntity = new Password();
			passwordEntity.hash = hashedPassword;
			passwordEntity.salt = salt;

			// Create a new user
			const user = new User();
			user.firstName = firstName;
			user.lastName = lastName;
			user.email = email;
			user.username = username;
			user.password = passwordEntity;
			user.profilePictureUrl = profilePictureUrl;
			user.friends = []; // Initialize with no friends

			const userConfiguration = new UserConfiguration();
			userConfiguration.profileBackgroundColor1 = faker.color.rgb();
			userConfiguration.profileBackgroundColor2 = faker.color.rgb();
			user.configuration = userConfiguration;

			return user;
		}),
	);

	// 2) Save all users so they get assigned IDs
	await connection.manager.save(users);
	console.log("Users have been inserted into the database.");

	// 3) Initialize friendship tracking
	const friendLimit = 4; // Maximum number of friends per user
	const userFriendCounts: Record<number, number> = {}; // Track number of friends per user ID

	users.forEach((user) => {
		userFriendCounts[user.id] = 0;
	});

	// 4) Generate all possible unique user pairs (A, B) where A.id < B.id
	const userPairs: [User, User][] = [];
	for (let i = 0; i < users.length; i++) {
		for (let j = i + 1; j < users.length; j++) {
			userPairs.push([users[i], users[j]]);
		}
	}

	// 5) Shuffle the user pairs to randomize friendship assignments
	faker.helpers.shuffle(userPairs);

	// 6) Assign mutual friendships based on shuffled pairs
	for (const [userA, userB] of userPairs) {
		// Check if both users can accept more friends
		if (userFriendCounts[userA.id] < friendLimit && userFriendCounts[userB.id] < friendLimit) {
			// Assign each other as friends
			userA.friends.push(userB);
			userB.friends.push(userA);

			// Update friend counts
			userFriendCounts[userA.id]++;
			userFriendCounts[userB.id]++;
		}

		// Optional: Break early if all users have reached their friend limits
		// Uncomment the following lines if you want to stop once all users have max friends
		// const allReachedLimit = users.every(user => userFriendCounts[user.id] >= friendLimit);
		// if (allReachedLimit) break;
	}

	// 7) Save the updated friendships to the database
	await connection.manager.save(users);
	console.log("Users now have mutually assigned friends.");

	return users;
}

/**
 * Seeds posts into the "post" table.
 * @param connection The database connection.
 * @param users Array of users to associate posts with.
 * @param interests Array of interests to associate posts with.
 */
export async function seedPosts(connection: Connection, users: User[], interests: Interest[]): Promise<Post[]> {
	const posts = await Promise.all(
		Array.from({ length: 20 }).map(async () => {
			const randomUser = users[Math.floor(Math.random() * users.length)];
			const randomInterest = interests[Math.floor(Math.random() * interests.length)];

			// Decide if this post has content only, picture only, or both
			const randomType = Math.floor(Math.random() * 3);
			// 0 -> content only
			// 1 -> picture only
			// 2 -> both

			const post = new Post();
			post.creator = randomUser;
			post.interest = randomInterest;

			switch (randomType) {
				case 0:
					post.content = faker.lorem.sentences(3);
					post.postPicture = ""; // no picture
					break;
				case 1:
					post.content = ""; // no content
					post.postPicture = faker.image.urlPicsumPhotos();
					break;
				case 2:
					post.content = faker.lorem.sentences(3);
					post.postPicture = faker.image.urlPicsumPhotos();
					break;
			}

			return post;
		}),
	);

	await connection.manager.save(posts);
	console.log("Posts have been inserted into the database.");
	return posts;
}

/**
 * Seeds comments into the "comment" table using array methods.
 * @param connection The database connection.
 * @param users Array of users to associate comments with.
 * @param posts Array of posts to associate comments with.
 */
async function seedComments(connection: Connection, users: User[], posts: Post[]): Promise<void> {
	const comments = posts.flatMap((post) => {
		const numberOfComments = Math.floor(Math.random() * 6) + 1; // Generate 1 to 6 comments per post
		return Array.from({ length: numberOfComments }).map(() => {
			const randomUser = users[Math.floor(Math.random() * users.length)];

			const comment = new Comment();
			comment.content = faker.lorem.sentences(2);
			comment.creator = randomUser;
			comment.post = post;

			return comment;
		});
	});

	await connection.manager.save(comments);
	console.log("Comments have been inserted into the database.");
}

/**
 * Seeds reactions into the "reaction" table.
 * Each user will react to multiple posts and comments.
 * @param connection The database connection.
 * @param users Array of users to associate reactions with.
 * @param posts Array of posts to associate reactions with.
 * @param comments Array of comments to associate reactions with.
 */
async function seedReactions(connection: Connection, users: User[], posts: Post[], comments: Comment[]): Promise<void> {
	const reactions = [];
	const reactionTypes = ["like", "dislike", "smile", "angry", "sad", "love"];

	function getRandomSubarray<T>(arr: T[], n: number): T[] {
		const shuffled = arr.slice(0);
		let i = arr.length;
		const min = i - n;
		let temp: T;
		let index: number;

		while (i-- > min) {
			index = Math.floor((i + 1) * Math.random());
			temp = shuffled[index];
			shuffled[index] = shuffled[i];
			shuffled[i] = temp;
		}
		return shuffled.slice(min);
	}

	users.forEach((user) => {
		// Filter out posts without a creator or created by this user
		const otherUsersPosts = posts.filter((post) => post.creator?.id && post.creator.id !== user.id);

		if (otherUsersPosts.length > 0) {
			const numberOfPostReactions = Math.floor(Math.random() * (otherUsersPosts.length / 2)) + 1;
			const postsToReactTo = getRandomSubarray(otherUsersPosts, numberOfPostReactions);

			postsToReactTo.forEach((post) => {
				const randomReactionType =
					reactionTypes[Math.floor(Math.random() * reactionTypes.length)];

				const reaction = new Reaction();
				reaction.type = randomReactionType as ReactionType;
				reaction.user = user;
				reaction.post = post;

				reactions.push(reaction);
			});
		}
	});

	users.forEach((user) => {
		// Filter out comments without a creator or created by this user
		const otherUsersComments = comments.filter(
			(comment) => comment.creator?.id && comment.creator.id !== user.id,
		);

		if (otherUsersComments.length > 0) {
			const numberOfCommentReactions =
				Math.floor(Math.random() * (otherUsersComments.length / 2)) + 1;
			const commentsToReactTo = getRandomSubarray(otherUsersComments, numberOfCommentReactions);

			commentsToReactTo.forEach((comment) => {
				const randomReactionType =
					reactionTypes[Math.floor(Math.random() * reactionTypes.length)];

				const reaction = new Reaction();
				reaction.type = randomReactionType as ReactionType;
				reaction.user = user;
				reaction.comment = comment;

				reactions.push(reaction);
			});
		}
	});

	await connection.manager.save(reactions);
	console.log("Reactions have been inserted into the database.");
}

/**
 * Seeds reports into the "report" table.
 * Reports will be seeded for 3 users, 5 posts, and 5 comments.
 * Each report will be assigned to a randomly selected administrator.
 * @param connection The database connection.
 * @param users Array of users to associate reports with.
 * @param posts Array of posts to associate reports with.
 * @param comments Array of comments to associate reports with.
 * @param administrators Array of administrators to assign to reports.
 */
async function seedReports(
	connection: Connection,
	users: User[],
	posts: Post[],
	comments: Comment[],
	administrators: Administrator[],
): Promise<void> {
	const reports = [];
	const reportTypes = ["SPAM", "ABUSE", "INAPPROPRIATE_CONTENT", "HARASSMENT", "OTHER"];

	// Select 3 random users for user-based reports
	const reportedUsers = users.slice(0, 3);

	// Seed reports against users
	reportedUsers.forEach((reportedUser) => {
		const randomReporter = users[Math.floor(Math.random() * users.length)];
		const randomReportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
		const randomAdmin = administrators[Math.floor(Math.random() * administrators.length)];

		const report = new Report();
		report.reporter = randomReporter;
		report.reportedUser = reportedUser; // Set reportedUser reference
		report.reportType = ReportType[randomReportType as keyof typeof ReportType];
		report.message = faker.lorem.sentences(2);
		report.administrator = randomAdmin; // Assign an administrator

		reports.push(report);
	});

	// Select 5 random posts for post-based reports
	const reportedPosts = posts.slice(0, 5);

	// Seed reports against posts
	reportedPosts.forEach((reportedPost) => {
		const randomReporter = users[Math.floor(Math.random() * users.length)];
		const randomReportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
		const randomAdmin = administrators[Math.floor(Math.random() * administrators.length)];

		const report = new Report();
		report.reporter = randomReporter;
		report.reportedPost = reportedPost; // Set reportedPost reference
		report.reportType = ReportType[randomReportType as keyof typeof ReportType];
		report.message = faker.lorem.sentences(2);
		report.administrator = randomAdmin; // Assign an administrator

		reports.push(report);
	});

	// Select 5 random comments for comment-based reports
	const reportedComments = comments.slice(0, 5);

	// Seed reports against comments
	reportedComments.forEach((reportedComment) => {
		const randomReporter = users[Math.floor(Math.random() * users.length)];
		const randomReportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
		const randomAdmin = administrators[Math.floor(Math.random() * administrators.length)];

		const report = new Report();
		report.reporter = randomReporter;
		report.reportedComment = reportedComment; // Set reportedComment reference
		report.reportType = ReportType[randomReportType as keyof typeof ReportType];
		report.message = faker.lorem.sentences(2);
		report.administrator = randomAdmin; // Assign an administrator

		reports.push(report);
	});

	// Save all reports to the database
	await connection.manager.save(reports);
	console.log("Reports have been inserted into the database.");
}

/**
 * Seeds groups into the "group" table.
 * Each group will be assigned to an interest and owned by a user.
 * Users will also be added as members and moderators.
 * @param connection The database connection.
 * @param users Array of users to associate with groups.
 * @param interests Array of interests to associate with groups.
 */
async function seedGroups(connection: Connection, users: User[], interests: Interest[]): Promise<Group[]> {
	const groups = [];

	// Create 10 groups
	for (let i = 0; i < 10; i++) {
		const groupName = faker.company.name();
		const randomOwner = users[Math.floor(Math.random() * users.length)]; // Group owner
		const randomInterest = interests[Math.floor(Math.random() * interests.length)]; // Group interest

		// Select random members and moderators from users
		const groupMembers = users.slice(0, Math.floor(Math.random() * users.length)); // Random members
		const groupModerators = users.slice(0, Math.floor((Math.random() * groupMembers.length) / 2)); // Random moderators

		const group = new Group();
		group.name = groupName;
		group.owner = randomOwner;
		group.interest = randomInterest;
		group.users = groupMembers; // Assign users as group members
		group.moderators = groupModerators; // Assign moderators

		groups.push(group);
	}

	// Save all groups to the database
	await connection.manager.save(groups);
	console.log("Groups have been inserted into the database.");

	return groups;
}

/**
 * Main function to insert administrators, seed interests, users, groups, posts, comments, reactions, and reports.
 */
async function main() {
	const connection = await connectToDatabase();

	// Generate hashed password for admin
	const plainPassword = "yxcvbnm123";

	try {
		// Begin transaction
		await connection.query("BEGIN");

		// Truncate all tables
		await truncateTables(connection);

		// Seed administrators into the database
		await seedAdministrators(connection, plainPassword);

		// Fetch all administrators to use in report assignment
		const administrators = await connection.getRepository(Administrator).find();

		// Seed interests into the database
		const interests = await seedInterests(connection);

		// Seed users into the database
		const users = await seedUsers(connection, plainPassword);

		// Seed groups into the database
		await seedGroups(connection, users, interests);

		// Seed posts into the database
		const createdPosts = await seedPosts(connection, users, interests);

		// Seed comments into the database
		await seedComments(connection, users, createdPosts);

		// Fetch all comments for reaction and report seeding
		const posts = await connection.getRepository(Post).find({
			relations: ["creator", "interest"],
		});

		// Fetch comments with creator and post relations
		const comments = await connection.getRepository(Comment).find({
			relations: ["creator", "post"],
		});

		// Seed reactions into the database
		await seedReactions(connection, users, posts, comments);

		// Seed reports into the database and assign them to administrators
		await seedReports(connection, users, posts, comments, administrators);

		// Commit transaction
		await connection.query("COMMIT");
		console.log(
			"Administrators, interests, users, groups, posts, comments, reactions, and reports have been inserted successfully.",
		);
	} catch (error) {
		// Rollback transaction in case of error
		await connection.query("ROLLBACK");
		console.error("Error inserting data:", error);
	} finally {
		// Close the database connection
		await connection.destroy();
	}
}

// Entry point for running the script
main().catch((error) => console.error("Error in main:", error));
