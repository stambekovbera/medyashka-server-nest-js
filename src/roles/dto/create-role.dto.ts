import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
	@ApiProperty({ example: "admin", description: "Роль" })
	@IsString({ message: "Должно быть строкой" })
	readonly value: string;
	@ApiProperty({ example: "Администратор", description: "Описание роли" })
	@IsString({ message: "Должно быть строкой" })
	readonly description: string;
}