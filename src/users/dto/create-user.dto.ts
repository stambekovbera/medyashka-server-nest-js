import {
    ApiProperty
} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "example@example.com", description: "Почтовый адрес"})
    readonly email: string;

    @ApiProperty({example: "qwerty12345", description: "Пароль"})
    readonly password: string;

    @ApiProperty({example: "Иванов Иван Иванович", description: "ФИО"})
    readonly full_name: string;
}