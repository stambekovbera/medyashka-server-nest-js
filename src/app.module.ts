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
import { UsersAvatarsModule } from "./users-avatars/users-avatars.module";
import { UserAvatar } from "./users-avatars/user-avatar.entity";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { FirstBook } from "./books/first-books/first-book.entity";
import { SecondBook } from "./books/second-books/second-book.entity";
import { ThirdBook } from "./books/third-books/third-book.entity";
import { FourthBook } from "./books/fourth-books/fourth-book.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${ process.env.NODE_ENV }.env`,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static', 'images'),
			exclude: [ '/api*' ],
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [ User, Role, UserRole, UserAvatar, FirstBook, SecondBook, ThirdBook, FourthBook ],
			autoLoadModels: true,
		}),
		AuthModule,
		UsersModule,
		RolesModule,
		UserRolesModule,
		UsersAvatarsModule,
		FilesModule,
	],
})

export class AppModule {
}