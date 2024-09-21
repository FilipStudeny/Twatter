import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import AppModule from "./app.module";

async function bootstrap() {
	const logger = new Logger();

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle("API Documentation")
		.setDescription("The API description")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT", // This is the format expected in the Authorization header
				in: "header",
			},
			"JWT-auth", // Security name, used to reference the Bearer Auth
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(3000);

	logger.log(`Server started at: http://localhost:3000/api`);
}
bootstrap();
