import { Module } from '@nestjs/common';
import { SecondBooksService } from './second-books.service';
import { SecondBooksController } from './second-books.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { SecondBook } from "./second-book.entity";

@Module({
	providers: [ SecondBooksService ],
	controllers: [ SecondBooksController ],
	imports: [
		SequelizeModule.forFeature([ SecondBook ]),
	],
	exports: [
		SecondBooksService
	],
})
export class SecondBooksModule {
}
