import { DbResponse } from "@Shared/DbResponse";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class UserConfigurationDetail {
	@Field()
	id: string;

	@Field()
	profileBackgroundColor1: string;

	@Field()
	profileBackgroundColor2: string;

	@Field(() => Boolean, { nullable: true })
	friendRequest_Email_Notification?: boolean;

	@Field(() => Boolean, { nullable: true })
	friendRequest_App_Notification?: boolean;

	@Field(() => Boolean, { nullable: true })
	postReactedTo_Email_Notification?: boolean;

	@Field(() => Boolean, { nullable: true })
	postReactedTo_App_Notification?: boolean;

	@Field(() => Boolean, { nullable: true })
	commentReactedTo_Email_Notification?: boolean;

	@Field(() => Boolean, { nullable: true })
	commentReactedTo_App_Notification?: boolean;

	static createMap(mapper: Mapper): void {
		// Map from DbResponse to UserConfigurationDetail
		createMap(
			mapper,
			DbResponse,
			UserConfigurationDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.user_configuration_id),
			),
			forMember(
				(destination) => destination.profileBackgroundColor1,
				mapFrom((source) => source.user_profileBackgroundColor1),
			),
			forMember(
				(destination) => destination.profileBackgroundColor2,
				mapFrom((source) => source.user_profileBackgroundColor2),
			),
			forMember(
				(destination) => destination.friendRequest_Email_Notification,
				mapFrom((source) => source.user_friendRequest_Email_Notification),
			),
			forMember(
				(destination) => destination.friendRequest_App_Notification,
				mapFrom((source) => source.user_friendRequest_App_Notification),
			),
			forMember(
				(destination) => destination.postReactedTo_Email_Notification,
				mapFrom((source) => source.user_postReactedTo_Email_Notification),
			),
			forMember(
				(destination) => destination.postReactedTo_App_Notification,
				mapFrom((source) => source.user_postReactedTo_App_Notification),
			),
			forMember(
				(destination) => destination.commentReactedTo_Email_Notification,
				mapFrom((source) => source.user_commentReactedTo_Email_Notification),
			),
			forMember(
				(destination) => destination.commentReactedTo_App_Notification,
				mapFrom((source) => source.user_commentReactedTo_App_Notification),
			),
		);
	}
}
