import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import GenericResponse from "@Services/Shared/Responses/GenericResponse.type";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const className = context.getClass().name;
		const handlerName = context.getHandler().name;

		return next.handle().pipe(
			map((data) => {
				// If data is already a GenericResponse, leave it unchanged
				if (data instanceof GenericResponse) {
					return data;
				}

				// Wrap the original response in a GenericResponse
				const action = `${className}_${handlerName}`
					.replace(/([a-z0-9])([A-Z])/g, "$1_$2")
					.toUpperCase();
				return new GenericResponse(data?.message || "Success", action);
			}),
		);
	}
}
