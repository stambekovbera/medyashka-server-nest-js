import { Module } from '@nestjs/common';
import { BooksService } from "./books.service";
import { ThirdBooksService } from "./third-books/third-books.service";

@Module({
	providers: [ BooksService ],
	exports: [ BooksService ],
	imports: [
		ThirdBooksService
	],
})
export class BooksModule {
}