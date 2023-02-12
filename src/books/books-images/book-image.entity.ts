import { Model, Table } from "sequelize-typescript";


interface BookImageCreateAttributes {
}

@Table({ tableName: "books-images" })
export class BookImage extends Model<BookImage, BookImageCreateAttributes> {

}