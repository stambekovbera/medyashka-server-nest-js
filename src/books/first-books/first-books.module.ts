import { Module } from '@nestjs/common';
import { FirstBooksController } from './first-books.controller';
import { FirstBooksService } from './first-books.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { FirstBook } from "./first-book.entity";

@Module({
	controllers: [ FirstBooksController ],
	providers: [ FirstBooksService ],
	imports: [
		SequelizeModule.forFeature([ FirstBook ])
	],
	exports: [
		FirstBooksService
	],
})
export class FirstBooksModule {
}
