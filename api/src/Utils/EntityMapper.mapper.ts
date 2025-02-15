import { CreateAdminDto } from "@Services/Admin/Mutations/CreateAdmin/CreateAdmin.dto";
import SignUpUserData from "@Services/Auth/Mutations/SignUp/SignUpUserData";
import { CommentDetail } from "@Shared/Response/CommentDetail";
import { InterestDetail } from "@Shared/Response/InterestDetail";
import { NotificationDetail } from "@Shared/Response/NotificationDetail";
import { PostDetail } from "@Shared/Response/PostDetail";
import { ReportDetail } from "@Shared/Response/ReportDetail";
import UserConfigurationDetail from "@Shared/Response/UserConfigurationResponse";
import UserDetail from "@Shared/Response/UserDetail";
import { Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class EntityMapper extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	// eslint-disable-next-line class-methods-use-this
	override get profile() {
		return (mapper: Mapper) => {
			CommentDetail.createMap(mapper);
			CreateAdminDto.createMap(mapper);
			PostDetail.createMap(mapper);
			UserDetail.createMap(mapper);
			InterestDetail.createMap(mapper);
			SignUpUserData.createMap(mapper);
			ReportDetail.createMap(mapper);
			UserConfigurationDetail.createMap(mapper);
			NotificationDetail.createMap(mapper);
		};
	}
}
