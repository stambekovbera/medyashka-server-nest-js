import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
	@ApiProperty({ example: "example@example.com", description: "Почтовый адрес" })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: "Некорректный email" })
	readonly email: string;

	@ApiProperty({ example: "example", description: "Логин" })
	@IsString({ message: "Должно быть строкой" })
	readonly login: string;

	@ApiProperty({ example: "qwerty12345", description: "Пароль" })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: "Пароль должен быть не меньше 4 и не больше 16 символов" })
	readonly password: string;

	@ApiProperty({ example: "Иванов Иван Иванович", description: "ФИО" })
	@IsString({ message: "Должно быть строкой" })
	readonly full_name: string;

	@ApiProperty({ example: "user", description: "Роль" })
	readonly role: string;
}