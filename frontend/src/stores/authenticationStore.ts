import { create } from "zustand";

import { SignInResponse } from "../../../shared";

enum UserSession {
	accessToken = "accessToken",
	refreshToken = "refreshToken",
	isAuthenticated = "isAuthenticated",
}

type AuthenticationState = {
	isLoggedIn: boolean,
	signIn: (signInResponse: SignInResponse)=> void,
	signOut: ()=> void,
};
export const useAuthenticationStore = create<AuthenticationState>((set) => ({
	isLoggedIn: localStorage.getItem(UserSession.isAuthenticated) === "true",
	signIn: (signInResponse: SignInResponse) => {
		localStorage.setItem(UserSession.isAuthenticated, "true");
		localStorage.setItem(UserSession.accessToken, signInResponse.accessToken);
		localStorage.setItem(UserSession.refreshToken, signInResponse.refreshToken);

		set({ isLoggedIn: true });
	},
	signOut: () => {
		localStorage.removeItem(UserSession.isAuthenticated);
		localStorage.removeItem(UserSession.accessToken);
		localStorage.removeItem(UserSession.refreshToken);

		set({ isLoggedIn: false });
	},
}));
