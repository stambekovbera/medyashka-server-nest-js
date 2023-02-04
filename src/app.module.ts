import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/user.entity";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/role.entity";
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserRole } from "./user-roles/user-role.entity";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${ process.env.NODE_ENV }.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [ User, Role, UserRole ],
			autoLoadModels: true,
		}),
		AuthModule,
		UsersModule,
		RolesModule,
		UserRolesModule,
	],
})

export class AppModule {
}