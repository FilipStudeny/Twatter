import { authActions, useAuthenticationStore } from "@Stores/authenticationStore";
import { GraphQLClient } from "graphql-request";

import { useRefreshTokenMutation } from "../../../shared";

const GRAPHQL_ENDPOINT = "your-graphql-endpoint";

class TokenRefreshHandler {
	private static isRefreshing = false;
	private static refreshSubscribers: ((token: string)=> void)[] = [];
	private static graphqlClient: GraphQLClient;

	static initialize(endpoint: string) {
		this.graphqlClient = new GraphQLClient(endpoint);
	}

	static subscribeToTokenRefresh(cb: (token: string)=> void) {
		this.refreshSubscribers.push(cb);
	}

	static onTokenRefreshed(token: string) {
		this.refreshSubscribers.forEach((cb) => cb(token));
		this.refreshSubscribers = [];
	}

	static async refreshToken(): Promise<string | null> {
		if (this.isRefreshing) {
			// Return a promise that resolves when the refresh is complete
			return new Promise((resolve) => {
				this.subscribeToTokenRefresh(resolve);
			});
		}

		try {
			this.isRefreshing = true;
			const refreshToken = useAuthenticationStore.getState().getRefreshToken();

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			const response = await useRefreshTokenMutation.fetcher({ refreshToken })();
			if (response.refreshToken) {
				const { accessToken, refreshToken: newRefreshToken } = response.refreshToken;

				// Update the store with new tokens
				authActions.setTokens(accessToken, newRefreshToken);

				// Notify subscribers about the new token
				this.onTokenRefreshed(accessToken);

				return accessToken;
			}

			return null;
		} catch (error) {
			console.error("Token refresh failed:", error);
			authActions.signOut();
			throw error;
		} finally {
			this.isRefreshing = false;
		}
	}

	static createRequestMiddleware() {
		return async (request: any) => {
			const accessToken = useAuthenticationStore.getState().getAccessToken();

			if (accessToken) {
				request.headers = {
					...request.headers,
					Authorization: `Bearer ${accessToken}`,
				};
			}

			return request;
		};
	}

	static createResponseMiddleware() {
		return async (response: any) => {
			const isAuthError = response.errors?.some(
				(error: any) =>
					error.extensions?.code === "UNAUTHENTICATED" || error.extensions?.originalError?.statusCode === 401,
			);

			if (isAuthError) {
				try {
					const newToken = await this.refreshToken();

					if (newToken) {
						// Retry the original request with the new token
						const newHeaders = {
							...response.operation.headers,
							Authorization: `Bearer ${newToken}`,
						};

						return await this.graphqlClient.request(
							response.operation.query,
							response.operation.variables,
							newHeaders,
						);
					}
				} catch (error) {
					authActions.signOut();
					throw error;
				}
			}

			return response;
		};
	}
}

TokenRefreshHandler.initialize(GRAPHQL_ENDPOINT);

export { TokenRefreshHandler };
