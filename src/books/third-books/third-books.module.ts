import { Module } from '@nestjs/common';
import { ThirdBooksService } from './third-books.service';
import { ThirdBooksController } from "./third-books.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ThirdBook } from "./third-book.entity";

@Module({
	providers: [ ThirdBooksService ],
	controllers: [ ThirdBooksController ],
	imports: [
		SequelizeModule.forFeature([ ThirdBook ])
	],
	exports: [ ThirdBooksService ],
})
export class ThirdBooksModule {
}
