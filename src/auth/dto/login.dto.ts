import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
	@ApiProperty({ example: "example@example.com", description: "Почтовый адрес" })
	readonly email: string;

	@ApiProperty({ example: "example", description: "Логин" })
	readonly login: string;

	@ApiProperty({ example: "qwerty12345", description: "Пароль" })
	readonly password: string;
}