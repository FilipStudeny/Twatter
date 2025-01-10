import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";

// Predefined GraphQL client
const graphqlClient = new GraphQLClient("http://localhost:3000/graphql");

export function setAuthorizationHeader(token?: string) {
	if (token) {
		graphqlClient.setHeader("Authorization", `Bearer ${token}`);
	} else {
		graphqlClient.setHeader("Authorization", "");
	}
}


export function fetcher<TData, TVariables extends { [key: string]: any }>(
	query: string,
	variables?: TVariables,
	requestHeaders?: RequestInit["headers"]
) {
	return async (): Promise<TData> =>
		graphqlClient.request({
			document: query,
			variables,
			requestHeaders,
		});
}

// Export the client in case it needs to be reused elsewhere
export { graphqlClient };
