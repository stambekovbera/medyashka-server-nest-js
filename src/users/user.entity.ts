import {
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";

interface UserCreateAttributes {
    email: string;
    password: string;
    full_name: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreateAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    full_name: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    verification_code: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    email_confirmed: boolean;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
}