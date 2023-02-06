import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class CreateUserAvatarDto {
	@ApiProperty({ example: "1", description: "Уникальный идентификатор пользователя" })
	@IsNumberString({}, { message: "Должно быть числом или строкой" })
	userId: number;
}