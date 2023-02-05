import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { BanUserDto } from "./dto/ban-user.dto";

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
		const role = await this.roleRepository.getRoleByValue(defaultRole);

		if (!role) {
			const roles = this.roleRepository.getAllRoles();
			throw new HttpException(`Роли '${ defaultRole.toUpperCase() }' не существует, выберите одну из ролей: '${ roles && await roles.then(res => res.map(role => role.value.toUpperCase()).join(', ')) }'`, HttpStatus.BAD_REQUEST);
		}

		const user = await this.userRepository.create(dto);
		await user.$set('roles', [ role.id ]);
		user.roles = [ role ];

		return user;
	}

	async editUser() {

	}

	async deleteUser() {

	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
		return user;
	}

	async getUserByLogin(login: string) {
		const user = await this.userRepository.findOne({ where: { login }, include: { all: true } });
		return user;
	}

	async banUser(dto: BanUserDto) {
		const {
			userId,
			banReason
		} = dto;

		const user = this.userRepository.findByPk(userId);

		if (!user) {
			throw new HttpException(`Пользователь не найден`, HttpStatus.BAD_REQUEST);
		}
	}
}
