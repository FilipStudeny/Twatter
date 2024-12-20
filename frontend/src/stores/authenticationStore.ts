import { create } from "zustand";

type AuthenticationState = {
	isLoggedIn: boolean,
	signIn: ()=> void,
	signOut: ()=> void,
};

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
	isLoggedIn: localStorage.getItem("isAuthenticated") === "true",
	signIn: () => {
		localStorage.setItem("isAuthenticated", "true");
		set({ isLoggedIn: true });
	},
	signOut: () => {
		localStorage.removeItem("isAuthenticated");
		set({ isLoggedIn: false });
	},
}));
