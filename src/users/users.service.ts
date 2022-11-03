import {Inject, Injectable} from '@nestjs/common';
import {USER_REPOSITORY} from "../constants";
import {User} from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: typeof User
    ) {
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

}
