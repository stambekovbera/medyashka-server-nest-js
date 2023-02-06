import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.entity";

interface UserAvatarAttributes {
	userId: number;
	image: string;
}

@Table({ tableName: 'users-avatars' })
export class UserAvatar extends Model<UserAvatar, UserAvatarAttributes> {
	@ApiProperty({ example: "1", description: "Уникальный идентификатор" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: "admin", description: "Изображение" })
	@Column({ type: DataType.STRING, allowNull: false })
	image: string;

	@ApiProperty({ example: "True", description: "Статус изображения" })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	removed: boolean;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId: number;

	@BelongsTo(() => User)
	user: User;
}