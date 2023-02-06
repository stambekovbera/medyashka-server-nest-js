import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DeleteUserAvatarDto {
	@ApiProperty({ example: "1", description: "Уникальный идентификатор изображения" })
	@IsNumber({}, { message: "Должно быть числом" })
	id: number;
}