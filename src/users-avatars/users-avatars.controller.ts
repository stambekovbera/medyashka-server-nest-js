import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersAvatarsService } from "./users-avatars.service";
import { CreateUserAvatarDto } from "./dto/create-user-avatar.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";

@ApiTags('Изображения пользователей')
@Controller('users-avatars')
export class UsersAvatarsController {
	constructor(private usersAvatarsService: UsersAvatarsService) {
	}

	@ApiOperation({ summary: "Добавить изображение" })
	@ApiResponse({ status: 200 })
	@UseGuards(JwtAuthGuard)
	@Post()
	@UseInterceptors(FilesInterceptor('images'))
	createUserAvatar(@Body() dto: CreateUserAvatarDto, @UploadedFiles() images) {
		return this.usersAvatarsService.createUserAvatar(dto, images);
	}
}
