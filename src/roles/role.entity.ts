import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";
import {
    ApiProperty
} from "@nestjs/swagger";
import {
    User
} from "../users/user.entity";
import {
    UserRole
} from "../user-roles/user-role.entity";

interface RoleCreateAttributes {
    value: string;
    description: string;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreateAttributes> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "admin", description: "Роль"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Администратор", description: "Описание роли"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}