import { Module } from '@nestjs/common';
import { FourthBooksController } from './fourth-books.controller';
import { FourthBooksService } from './fourth-books.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { FourthBook } from "./fourth-book.entity";

@Module({
	controllers: [ FourthBooksController ],
	providers: [ FourthBooksService ],
	imports: [
		SequelizeModule.forFeature([ FourthBook ]),
	],
	exports: [
		FourthBooksService
	],
})
export class FourthBooksModule {
}
