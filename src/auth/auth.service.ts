import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }


    async login(dto: LoginDto) {
    }

    async registration(dto: CreateUserDto) {
        const {
            email, password, full_name, login
        } = dto;

        if (!email) {
            throw new HttpException("Не указан почтовый адрес", HttpStatus.BAD_REQUEST);
        }
        if (!password) {
            throw new HttpException('Не указан пароль', HttpStatus.BAD_REQUEST);
        }
        if (!full_name) {
            throw new HttpException('Не указаны ФИО', HttpStatus.BAD_REQUEST);
        }
        if (!login) {
            throw new HttpException('Не указан логин', HttpStatus.BAD_REQUEST);
        }

        const candidateByEmail = await this.userService.getUserByEmail(dto.email);
        const candidateByLogin = await this.userService.getUserByLogin(dto.login);

        if (candidateByEmail) {
            throw new HttpException('Этот почтовый адрес уже зарегистрирован', HttpStatus.BAD_REQUEST);
        }
        if (candidateByLogin) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({...dto, password: hashPassword});

        await this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            login: user.login,
            full_name: user.full_name,
            active: user.active,
            email_confirmed: user.email_confirmed,
            banned: user.banned,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
