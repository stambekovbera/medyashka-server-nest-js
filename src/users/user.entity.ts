import {
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";
import {
    ApiProperty
} from "@nestjs/swagger";

interface UserCreateAttributes {
    email: string;
    password: string;
    full_name: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreateAttributes> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "example@example.com", description: "Почтовый адрес"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "example-password", description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "Иван Иванов", description: "ФИО"})
    @Column({type: DataType.STRING, allowNull: false})
    full_name: string;

    @ApiProperty({example: "0000", description: "Код подтверждения"})
    @Column({type: DataType.INTEGER, allowNull: true})
    verification_code: number;

    @ApiProperty({example: "true", description: "Подтверждение ли почтовый адрес"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    email_confirmed: boolean;

    @ApiProperty({example: "true", description: "Заблокирован ли пользователь"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "true", description: "Деактивирован ли пользователь"})
    @Column({type: DataType.BOOLEAN, defaultValue: true})
    active: boolean;
}