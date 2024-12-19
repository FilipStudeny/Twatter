import { create } from "zustand";

// Define the shape of your authentication state
type AuthenticationState = {
	isLoggedIn: boolean,
	signIn: ()=> void,
	signOut: ()=> void,
};

// Create the authentication store
export const useAuthenticationStore = create<AuthenticationState>((set) => ({
	isLoggedIn: false,
	signIn: () => set({ isLoggedIn: true }),
	signOut: () => set({ isLoggedIn: false }),
}));
