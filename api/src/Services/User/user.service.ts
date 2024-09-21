import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export default class UserService {
	constructor(private commandBus: CommandBus) {}
}
