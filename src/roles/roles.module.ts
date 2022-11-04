import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {Role} from "./role.entity";
import {User} from "../users/user.entity";
import {UserRole} from "../user-roles/user-role.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRole])
  ],
})
export class RolesModule {}
