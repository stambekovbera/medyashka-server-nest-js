import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";


interface SecondBookCreateAttributes {
	page_foreword: string;
	foreword_author: string,
	page_chapter: string,
	page_title: string,
	page_text: string,
	page_message: string,
}

@Table({ tableName: "second-books" })
export class SecondBook extends Model<SecondBook, SecondBookCreateAttributes> {
	@ApiProperty({ example: "1", description: "Уникальный идентификатор" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;
	@ApiProperty({ example: "example", description: "Предисловие" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	page_foreword: string;
	@ApiProperty({ example: "example", description: "Автор предисловия" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	foreword_author: string;
	@ApiProperty({ example: "example", description: "Глава" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	page_chapter: string;
	@ApiProperty({ example: "example", description: "Заголовок" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	page_title: string;
	@ApiProperty({ example: "example", description: "Текст" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	page_text: string;
	@ApiProperty({ example: "example", description: "Вспомогательный текст" })
	@Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
	page_message: string;
}