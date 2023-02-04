import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.entity";
import { Role } from "../roles/role.entity";
import { UserRole } from "../user-roles/user-role.entity";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	controllers: [ UsersController ],
	providers: [ UsersService ],
	imports: [
		SequelizeModule.forFeature([ User, Role, UserRole ]),
		RolesModule,
		forwardRef(() => AuthModule)
	],
	exports: [ UsersService ],
})
export class UsersModule {
}
