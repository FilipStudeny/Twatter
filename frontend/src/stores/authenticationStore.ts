import { create } from "zustand";
import { persist } from "zustand/middleware";

import { setAuthorizationHeader, SignInResponse, UserDetail } from "../../../shared";

type AuthenticationState = {
	isLoggedIn: boolean,
	userData: UserDetail | null,
	accessToken: string | null,
	refreshToken: string | null,
	signIn: (signInResponse: SignInResponse)=> void,
	signOut: ()=> void,
	getUserData: ()=> UserDetail | null,
	getRefreshToken: ()=> string | null,
	getAccessToken: ()=> string | null,
	setTokens: (accessToken: string, refreshToken: string)=> void,
};

export const useAuthenticationStore = create<AuthenticationState>()(
	persist(
		(set, get) => ({
			isLoggedIn: false,
			userData: null,
			accessToken: null,
			refreshToken: null,
			signIn: (signInResponse: SignInResponse) => {
				setAuthorizationHeader(signInResponse.accessToken);
				set({
					isLoggedIn: true,
					userData: signInResponse.userData,
					accessToken: signInResponse.accessToken,
					refreshToken: signInResponse.refreshToken,
				});
			},
			signOut: () => {
				setAuthorizationHeader();
				set({
					isLoggedIn: false,
					userData: null,
					accessToken: null,
					refreshToken: null,
				});
			},
			getUserData: () => get().userData,
			getRefreshToken: () => get().refreshToken,
			getAccessToken: () => get().accessToken,
			setTokens: (accessToken: string, refreshToken: string) => {
				setAuthorizationHeader(accessToken);
				set({
					accessToken,
					refreshToken,
					isLoggedIn: true,
				});
			},
		}),
		{
			name: "auth-storage",
		},
	),
);

export const authActions = {
	signOut: () => useAuthenticationStore.getState().signOut(),
	setTokens: (accessToken: string, refreshToken: string) =>
		useAuthenticationStore.getState().setTokens(accessToken, refreshToken),
};
