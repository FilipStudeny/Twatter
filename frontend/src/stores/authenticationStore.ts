import { create } from "zustand";

import { SignInResponse, UserDetail } from "../../../shared";

enum UserSession {
	accessToken = "accessToken",
	refreshToken = "refreshToken",
	isAuthenticated = "isAuthenticated",
	userData = "userData",
}

type AuthenticationState = {
	isLoggedIn: boolean,
	signIn: (signInResponse: SignInResponse)=> void,
	signOut: ()=> void,
	getUserData: ()=> UserDetail | null,
};
export const useAuthenticationStore = create<AuthenticationState>((set) => ({
	isLoggedIn: localStorage.getItem(UserSession.isAuthenticated) === "true",
	signIn: (signInResponse: SignInResponse) => {
		localStorage.setItem(UserSession.isAuthenticated, "true");
		localStorage.setItem(UserSession.accessToken, signInResponse.accessToken);
		localStorage.setItem(UserSession.refreshToken, signInResponse.refreshToken);
		localStorage.setItem(UserSession.userData, JSON.stringify(signInResponse.userData));

		set({ isLoggedIn: true });
	},
	signOut: () => {
		localStorage.removeItem(UserSession.isAuthenticated);
		localStorage.removeItem(UserSession.accessToken);
		localStorage.removeItem(UserSession.refreshToken);
		localStorage.removeItem(UserSession.userData);

		set({ isLoggedIn: false });
	},
	getUserData: () => {
		const storedUserData = localStorage.getItem(UserSession.userData);
		if (!storedUserData) {
			return null;
		}

		const parsedUserData = JSON.parse(storedUserData) as UserDetail;

		return parsedUserData;
	},
}));
