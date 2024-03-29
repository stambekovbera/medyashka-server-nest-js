import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

	constructor(
		private authService: AuthService
	) {
	}

	@ApiOperation({ summary: "Авторизация" })
	@ApiResponse({ status: 200, type: "jwt" })
	@Post('/login')
	login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@ApiOperation({ summary: "Регистрация" })
	@ApiResponse({ status: 200, type: "jwt" })
	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}
}
