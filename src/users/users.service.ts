import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
        if (!dto.email) {
            throw new HttpException("Не указан почтовый адрес", HttpStatus.BAD_REQUEST);
        }
        if (!dto.password) {
            throw new HttpException('Не указан пароль', HttpStatus.BAD_REQUEST);
        }
        if (!dto.full_name) {
            throw new HttpException('Не указаны ФИО', HttpStatus.BAD_REQUEST);
        }
        if (!dto.login) {
            throw new HttpException('Не указан логин', HttpStatus.BAD_REQUEST);
        }

        const defaultRole = dto?.role || "user";

        const user = await this.userRepository.create(dto);
        const role = await this.roleRepository.getRoleByValue(defaultRole);
        await user.$set('roles', [role.id]);
        user.roles = [role];

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

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});
        return user;
    }

}
