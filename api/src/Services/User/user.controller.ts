import { Body, Controller, Post } from "@nestjs/common";

import CreateUserDTO from "./POST/CreateUserCommand/CreateUserDto";
import UserService from "./user.service";

@Controller("users")
export default class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDTO) {
		return this.userService.createUser(createUserDto);
	}
}
