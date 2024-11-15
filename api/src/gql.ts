import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(
	client: GraphQLClient,
	query: string,
	variables?: TVariables,
	requestHeaders?: RequestInit["headers"],
) {
	return async (): Promise<TData> =>
		client.request({
			document: query,
			variables,
			requestHeaders,
		});
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: { input: any; output: any };
};

/** Different types of roles available */
export enum AdminRole {
	Admin = "ADMIN",
	Administrator = "ADMINISTRATOR",
	Moderator = "MODERATOR",
	Supervisor = "SUPERVISOR",
	SuperAdmin = "SUPER_ADMIN",
}

export type CommentDetail = {
	__typename?: "CommentDetail";
	content: Scalars["String"]["output"];
	createdAt: Scalars["DateTime"]["output"];
	creator: UserDetail;
	creatorId: Scalars["String"]["output"];
	id: Scalars["String"]["output"];
	postId: Scalars["String"]["output"];
	reactions: ReactionsCount;
	reactionsCount: Scalars["Int"]["output"];
	reportsCount: Scalars["Int"]["output"];
	strikesCount: Scalars["Int"]["output"];
	updatedAt: Scalars["DateTime"]["output"];
};

export type CommentDto = {
	__typename?: "CommentDto";
	content: Scalars["String"]["output"];
	createdAt: Scalars["DateTime"]["output"];
	creatorName: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
};

export type CreateAdminDto = {
	adminRole?: AdminRole;
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
	username: Scalars["String"]["input"];
};

export type CreateCommentDto = {
	content: Scalars["String"]["input"];
};

export type CreateGroupDto = {
	interestId: Scalars["String"]["input"];
	name: Scalars["String"]["input"];
};

export type CreateOrUpdateReactionDto = {
	reactionType: ReactionType;
	targetId: Scalars["String"]["input"];
	targetType: ReactionTargetType;
};

export type CreatePostDto = {
	content: Scalars["String"]["input"];
	groupId?: InputMaybe<Scalars["String"]["input"]>;
	interestId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserDto = {
	email: Scalars["String"]["input"];
	firstName: Scalars["String"]["input"];
	lastName: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
	repeatPassword: Scalars["String"]["input"];
};

export type GenericResponse = {
	__typename?: "GenericResponse";
	message?: Maybe<Scalars["String"]["output"]>;
};

/** Filter options for the graph data */
export enum GraphFilter {
	Day = "Day",
	Month = "Month",
	Year = "Year",
}

export type GroupDetail = {
	__typename?: "GroupDetail";
	id: Scalars["String"]["output"];
	interest: InterestDetail;
	membersCount: Scalars["Int"]["output"];
	moderators: Array<UserDetail>;
	name: Scalars["String"]["output"];
	owner: UserDetail;
	posts: Array<PostDetail>;
	postsCount: Scalars["Int"]["output"];
	users: Array<UserDetail>;
};

export type InterestDetail = {
	__typename?: "InterestDetail";
	groups?: Maybe<Array<GroupDetail>>;
	groupsCount?: Maybe<Scalars["Int"]["output"]>;
	id?: Maybe<Scalars["String"]["output"]>;
	name?: Maybe<Scalars["String"]["output"]>;
	posts?: Maybe<Array<PostDetail>>;
	postsCount?: Maybe<Scalars["Int"]["output"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	AddReaction: GenericResponse;
	CreateAdmin: GenericResponse;
	CreateComment: GenericResponse;
	CreatePost: GenericResponse;
	CreateUser: GenericResponse;
	PinComment: GenericResponse;
	SignInAdmin: SignInResponse;
	SignInUser: SignInResponse;
	createGroup: GenericResponse;
	logout: GenericResponse;
	refreshToken: SignInResponse;
};

export type MutationAddReactionArgs = {
	createOrUpdateReactionData: CreateOrUpdateReactionDto;
};

export type MutationCreateAdminArgs = {
	createAdminDto: CreateAdminDto;
};

export type MutationCreateCommentArgs = {
	createComment: CreateCommentDto;
	postId: Scalars["String"]["input"];
};

export type MutationCreatePostArgs = {
	createPost: CreatePostDto;
};

export type MutationCreateUserArgs = {
	createUser: CreateUserDto;
};

export type MutationPinCommentArgs = {
	commentId: Scalars["String"]["input"];
	postId: Scalars["String"]["input"];
};

export type MutationSignInAdminArgs = {
	signIn: SignInCredentials;
};

export type MutationSignInUserArgs = {
	signInUser: SignInCredentials;
};

export type MutationCreateGroupArgs = {
	createGroupDto: CreateGroupDto;
};

export type MutationLogoutArgs = {
	userId: Scalars["String"]["input"];
};

export type MutationRefreshTokenArgs = {
	refreshToken: Scalars["String"]["input"];
};

export type PaginatedCommentsResponse = {
	__typename?: "PaginatedCommentsResponse";
	items?: Maybe<Array<CommentDto>>;
	limit?: Maybe<Scalars["Int"]["output"]>;
	page?: Maybe<Scalars["Int"]["output"]>;
	total?: Maybe<Scalars["Int"]["output"]>;
};

export type PaginatedPostsListResponse = {
	__typename?: "PaginatedPostsListResponse";
	items?: Maybe<Array<PostDetail>>;
	limit?: Maybe<Scalars["Int"]["output"]>;
	page?: Maybe<Scalars["Int"]["output"]>;
	total?: Maybe<Scalars["Int"]["output"]>;
};

export type PaginatedUsersResponse = {
	__typename?: "PaginatedUsersResponse";
	items?: Maybe<Array<UserDetail>>;
	limit?: Maybe<Scalars["Int"]["output"]>;
	page?: Maybe<Scalars["Int"]["output"]>;
	total?: Maybe<Scalars["Int"]["output"]>;
};

export type PostDetail = {
	__typename?: "PostDetail";
	commentsCount?: Maybe<Scalars["Int"]["output"]>;
	content: Scalars["String"]["output"];
	createdAt: Scalars["DateTime"]["output"];
	creator: UserDetail;
	group?: Maybe<GroupDetail>;
	id: Scalars["String"]["output"];
	interest?: Maybe<InterestDetail>;
	isPinned?: Maybe<Scalars["Boolean"]["output"]>;
	pinnedComment?: Maybe<CommentDetail>;
	reactions?: Maybe<ReactionsCount>;
	reportsCount?: Maybe<Scalars["Int"]["output"]>;
	strikesCount?: Maybe<Scalars["Int"]["output"]>;
	updatedAt: Scalars["DateTime"]["output"];
};

export type PostGraphDataDto = {
	__typename?: "PostGraphDataDto";
	count: Scalars["Int"]["output"];
	period: Scalars["String"]["output"];
};

export type Query = {
	__typename?: "Query";
	GetComments: PaginatedCommentsResponse;
	GetPostDetail: PostDetail;
	getPosts: PaginatedPostsListResponse;
	getPostsStatistics: Array<PostGraphDataDto>;
	getUsers: PaginatedUsersResponse;
	hello: Scalars["String"]["output"];
	user: UserDetail;
};

export type QueryGetCommentsArgs = {
	limit: Scalars["Int"]["input"];
	page: Scalars["Int"]["input"];
	postId: Scalars["String"]["input"];
};

export type QueryGetPostDetailArgs = {
	postId: Scalars["String"]["input"];
};

export type QueryGetPostsArgs = {
	limit?: Scalars["Int"]["input"];
	page?: Scalars["Int"]["input"];
};

export type QueryGetPostsStatisticsArgs = {
	filter: GraphFilter;
	weekNumber?: InputMaybe<Scalars["Int"]["input"]>;
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetUsersArgs = {
	limit?: Scalars["Int"]["input"];
	page?: Scalars["Int"]["input"];
};

export type QueryUserArgs = {
	firstName?: InputMaybe<Scalars["String"]["input"]>;
	id?: InputMaybe<Scalars["ID"]["input"]>;
	lastName?: InputMaybe<Scalars["String"]["input"]>;
	username?: InputMaybe<Scalars["String"]["input"]>;
};

/** Target type for the reaction, either POST or COMMENT */
export enum ReactionTargetType {
	Comment = "COMMENT",
	Post = "POST",
}

/** Different types of reactions available */
export enum ReactionType {
	Angry = "ANGRY",
	Dislike = "DISLIKE",
	Like = "LIKE",
	Love = "LOVE",
	Sad = "SAD",
	Smile = "SMILE",
}

export type ReactionsCount = {
	__typename?: "ReactionsCount";
	angry: Scalars["Int"]["output"];
	dislike: Scalars["Int"]["output"];
	like: Scalars["Int"]["output"];
	love: Scalars["Int"]["output"];
	sad: Scalars["Int"]["output"];
	smile: Scalars["Int"]["output"];
};

export type SignInCredentials = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
	passwordRepeat: Scalars["String"]["input"];
};

export type SignInResponse = {
	__typename?: "SignInResponse";
	accessToken: Scalars["String"]["output"];
	refreshToken: Scalars["String"]["output"];
};

export type UserDetail = {
	__typename?: "UserDetail";
	banStrikesCount?: Maybe<Scalars["Int"]["output"]>;
	commentsCount?: Maybe<Scalars["Int"]["output"]>;
	createdGroupsCount?: Maybe<Scalars["Int"]["output"]>;
	email?: Maybe<Scalars["String"]["output"]>;
	filedReportsCount?: Maybe<Scalars["Int"]["output"]>;
	firstName?: Maybe<Scalars["String"]["output"]>;
	friendsCount?: Maybe<Scalars["Int"]["output"]>;
	id?: Maybe<Scalars["String"]["output"]>;
	joinedGroupsCount?: Maybe<Scalars["Int"]["output"]>;
	lastName?: Maybe<Scalars["String"]["output"]>;
	likesCount?: Maybe<Scalars["Int"]["output"]>;
	moderatedGroupsCount?: Maybe<Scalars["Int"]["output"]>;
	postsCount?: Maybe<Scalars["Int"]["output"]>;
	receivedReportsCount?: Maybe<Scalars["Int"]["output"]>;
	sentNotificationsCount?: Maybe<Scalars["Int"]["output"]>;
	username?: Maybe<Scalars["String"]["output"]>;
};

export type GetPostsQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPostsQuery = {
	__typename?: "Query";
	getPosts: {
		__typename?: "PaginatedPostsListResponse";
		total?: number | null;
		page?: number | null;
		limit?: number | null;
		items?: Array<{
			__typename?: "PostDetail";
			id: string;
			content: string;
			commentsCount?: number | null;
			createdAt: any;
			creator: {
				__typename?: "UserDetail";
				id?: string | null;
				username?: string | null;
				postsCount?: number | null;
			};
			reactions?: {
				__typename?: "ReactionsCount";
				like: number;
				dislike: number;
				sad: number;
				smile: number;
				angry: number;
				love: number;
			} | null;
			interest?: { __typename?: "InterestDetail"; name?: string | null } | null;
		}> | null;
	};
};

export type GetPostsDetailsListQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPostsDetailsListQuery = {
	__typename?: "Query";
	getPosts: {
		__typename?: "PaginatedPostsListResponse";
		total?: number | null;
		page?: number | null;
		limit?: number | null;
		items?: Array<{
			__typename?: "PostDetail";
			id: string;
			content: string;
			commentsCount?: number | null;
			createdAt: any;
			creator: { __typename?: "UserDetail"; id?: string | null; username?: string | null };
			reactions?: {
				__typename?: "ReactionsCount";
				like: number;
				dislike: number;
				sad: number;
				smile: number;
				angry: number;
				love: number;
			} | null;
			interest?: { __typename?: "InterestDetail"; name?: string | null } | null;
			group?: { __typename?: "GroupDetail"; id: string; name: string } | null;
		}> | null;
	};
};

export const GetPostsDocument = `
    query GetPosts($page: Int = 1, $limit: Int = 10) {
  getPosts(page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
        postsCount
      }
      reactions {
        like
        dislike
        sad
        smile
        angry
        love
      }
      interest {
        name
      }
      commentsCount
      createdAt
    }
    total
    page
    limit
  }
}
    `;

export const useGetPostsQuery = <TData = GetPostsQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: GetPostsQueryVariables,
	options?: UseQueryOptions<GetPostsQuery, TError, TData>,
	headers?: RequestInit["headers"],
) =>
	useQuery<GetPostsQuery, TError, TData>(
		variables === undefined ? ["GetPosts"] : ["GetPosts", variables],
		fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
		options,
	);

useGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) =>
	variables === undefined ? ["GetPosts"] : ["GetPosts", variables];

useGetPostsQuery.fetcher = (
	client: GraphQLClient,
	variables?: GetPostsQueryVariables,
	headers?: RequestInit["headers"],
) => fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers);

export const GetPostsDetailsListDocument = `
    query GetPostsDetailsList($page: Int = 1, $limit: Int = 10) {
  getPosts(page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
      }
      reactions {
        like
        dislike
        sad
        smile
        angry
        love
      }
      interest {
        name
      }
      group {
        id
        name
      }
      commentsCount
      createdAt
    }
    total
    page
    limit
  }
}
    `;

export const useGetPostsDetailsListQuery = <TData = GetPostsDetailsListQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: GetPostsDetailsListQueryVariables,
	options?: UseQueryOptions<GetPostsDetailsListQuery, TError, TData>,
	headers?: RequestInit["headers"],
) =>
	useQuery<GetPostsDetailsListQuery, TError, TData>(
		variables === undefined ? ["GetPostsDetailsList"] : ["GetPostsDetailsList", variables],
		fetcher<GetPostsDetailsListQuery, GetPostsDetailsListQueryVariables>(
			client,
			GetPostsDetailsListDocument,
			variables,
			headers,
		),
		options,
	);

useGetPostsDetailsListQuery.getKey = (variables?: GetPostsDetailsListQueryVariables) =>
	variables === undefined ? ["GetPostsDetailsList"] : ["GetPostsDetailsList", variables];

useGetPostsDetailsListQuery.fetcher = (
	client: GraphQLClient,
	variables?: GetPostsDetailsListQueryVariables,
	headers?: RequestInit["headers"],
) =>
	fetcher<GetPostsDetailsListQuery, GetPostsDetailsListQueryVariables>(
		client,
		GetPostsDetailsListDocument,
		variables,
		headers,
	);
