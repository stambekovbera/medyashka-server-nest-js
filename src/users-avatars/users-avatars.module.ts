import { Module } from '@nestjs/common';
import { UsersAvatarsService } from './users-avatars.service';
import { UsersAvatarsController } from './users-avatars.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.entity";
import { UserAvatar } from "./user-avatar.entity";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	providers: [ UsersAvatarsService ],
	controllers: [ UsersAvatarsController ],
	imports: [
		SequelizeModule.forFeature([ User, UserAvatar ]),
		FilesModule,
		AuthModule
	],
})
export class UsersAvatarsModule {
}