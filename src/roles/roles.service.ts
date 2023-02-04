import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role)
		private roleRepository: typeof Role
	) {
	}

	async createRole(dto: CreateRoleDto) {
		const {
			value,
			description
		} = dto;

		if (!value) {
			throw new HttpException("Не указана роль", HttpStatus.BAD_REQUEST);
		}

		if (!description) {
			throw new HttpException("Не указано описание роли", HttpStatus.BAD_REQUEST);
		}
		const candidateRole = await this.getRoleByValue(value.toLowerCase());

		if (candidateRole) {
			throw new HttpException("Роль уже существует", HttpStatus.BAD_REQUEST);
		}

		return await this.roleRepository.create({ ...dto, value: dto.value.toLowerCase() });
	}

	async getRoleByValue(value: string) {
		const role = await this.roleRepository.findOne({ where: { value } });
		return role;
	}

	async getAllRoles() {
		const roles = await this.roleRepository.findAll();
		return roles;
	}
}
