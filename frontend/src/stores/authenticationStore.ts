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
		}),
		{
			name: "auth-storage",
		},
	),
);
