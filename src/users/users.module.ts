import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.entity";
import {Role} from "../roles/role.entity";
import {UserRole} from "../user-roles/user-role.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole])
  ],
})
export class UsersModule {
}
