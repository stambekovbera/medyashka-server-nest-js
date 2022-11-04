import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {Role} from "../roles/role.entity";

@Table({tableName: "user_roles"})
export class UserRole extends Model<UserRole> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "1", description: "Уникальный идентификатор роли"})
    @ForeignKey(() => Role)
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    roleId: string;

    @ApiProperty({example: "1", description: "Уникальный идентификатор пользователя"})
    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    userId: string;
}