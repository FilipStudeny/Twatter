// generate-hash.ts
import * as bcrypt from "bcrypt";

async function generateHash(password: string): Promise<void> {
	try {
		const saltRounds = 10; // You can adjust the cost factor
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);

		console.log("Salt:", salt);
		console.log("Hashed Password:", hashedPassword);
	} catch (error) {
		console.error("Error generating hash:", error);
	}
}

// Get the password from the command-line arguments
const password: string | undefined = process.argv[2];

if (!password) {
	console.error("Please provide a password as a command-line argument.");
	console.error("Usage: ts-node generate-hash.ts <password>");
	process.exit(1);
}

// Call the function to generate hash and salt
generateHash(password);
