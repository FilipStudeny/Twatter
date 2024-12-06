import { Module, Global } from "@nestjs/common";
import Redis from "ioredis";

@Global()
@Module({
	providers: [
		{
			provide: "REDIS_CLIENT",
			useFactory: () =>
				new Redis({
					host: "localhost", // Replace with your Redis host
					port: 6379, // Replace with your Redis port
				}),
		},
	],
	exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
