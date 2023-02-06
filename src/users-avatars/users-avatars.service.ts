import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { UserAvatar } from "./user-avatar.entity";
import { FilesService } from "../files/files.service";
import { CreateUserAvatarDto } from "./dto/create-user-avatar.dto";

@Injectable()
export class UsersAvatarsService {
	constructor(
		@InjectModel(UserAvatar) private userAvatarRepository: typeof UserAvatar,
		private filesService: FilesService
	) {
	}

	async createUserAvatar(dto: CreateUserAvatarDto, images: any[]) {
		if (images.length <= 0) {
			throw new HttpException('Прикрепите изображения', HttpStatus.BAD_REQUEST);
		}

		if (!dto.userId) {
			throw new HttpException('Не удалось получить уникальный идентификатор пользователя, попробуйте снова', HttpStatus.BAD_REQUEST);
		}

		const userImages = await this.userAvatarRepository.findAll({ where: { userId: dto.userId } }).then(res => res.filter(image => !image.removed));

		if ((images.length + userImages.length) >= 7) {
			throw new HttpException(`Максимальное кол-во - 6 изобр., на данный момент у вас загружено - ${ userImages.length } изобр., вы можете загрузить еще ${ 6 - userImages.length } изобр.`, HttpStatus.BAD_REQUEST);
		}

		let createdImages = [];

		for await (let image of images) {
			const file = await this.filesService.createFile(image);
			const createImage = await this.userAvatarRepository.create({ ...dto, image: file })

			createdImages.push(createImage);
		}

		return createdImages;
	}
}
