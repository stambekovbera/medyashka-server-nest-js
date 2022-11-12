import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {UserRole} from "../user-roles/user-role.entity";

interface ImageCreateAttributes {
    src: string;
}

@Table({tableName: "images"})
export class Image extends Model<Image, ImageCreateAttributes> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

}