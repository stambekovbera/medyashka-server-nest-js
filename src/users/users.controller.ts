import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { RolesGuard } from "../roles/guards/roles.guard";
import { Roles } from "../roles/decorators/roles-auth.decorator";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {
	}

	@ApiOperation({ summary: "Создание пользователя" })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: "Получение всех пользователей" })
	@ApiResponse({ status: 200, type: [ User ] })
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: "Забанить пользователя" })
	@ApiResponse({ status: 200 })
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() banDto: BanUserDto) {
		return this.usersService.banUser(banDto);
	}
}