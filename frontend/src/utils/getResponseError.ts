import { GraphQLResponse } from "graphql-request/dist/types";

export const GET_ERROR = (err: GraphQLResponse) => {
	// Make sure we're actually referencing `err`, not `error`.
	const error = err?.response?.errors?.[0]?.extensions?.originalError?.message;

	// If error is an array (e.g., ["email must be an email"]), join it for display:
	if (Array.isArray(error)) {
		return error.join(", ");
	}

	// Otherwise, just return error as a string, or a fallback if it’s undefined
	return error ?? "Unknown error";
};
