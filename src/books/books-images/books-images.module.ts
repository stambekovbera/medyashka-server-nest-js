import { Module } from '@nestjs/common';
import { BooksImagesController } from './books-images.controller';
import { BooksImagesService } from './books-images.service';

@Module({
  controllers: [BooksImagesController],
  providers: [BooksImagesService]
})
export class BooksImagesModule {}
