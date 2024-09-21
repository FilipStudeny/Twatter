import { Body, Controller, Post } from "@nestjs/common";

import CreateUserDto from "./POST/CreateUserCommand/CreateUserDto";
import SignInCredentialsDto from "./POST/SignInCommand/SignInCredentialsDto";
import AuthService from "./auth.service";

@Controller("auth")
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/signin")
	async SignIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<{ token: string }> {
		return this.authService.signIn(signInCredentialsDto);
	}

	@Post("/signup")
	async CreateUser(@Body() createUserDto: CreateUserDto) {
		return this.authService.createUser(createUserDto);
	}
}
