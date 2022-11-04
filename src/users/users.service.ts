import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleRepository: RolesService
    ) {
    }


    async createUser(dto: CreateUserDto) {
        const defaultRole = dto?.role || "user";

        const user = await this.userRepository.create(dto);
        const role = await this.roleRepository.getRoleByValue(defaultRole);
        await user.$set('roles', [role.id]);

        return user;
    }

    async editUser() {

    }

    async deleteUser() {

    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

}
