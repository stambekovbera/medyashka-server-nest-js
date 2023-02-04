import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserRole } from "./user-role.entity";

@Module({
	providers: [ UserRolesService ],
	controllers: [ UserRolesController ],
	imports: [
		SequelizeModule.forFeature([ UserRole ])
	],
})
export class UserRolesModule {
}
