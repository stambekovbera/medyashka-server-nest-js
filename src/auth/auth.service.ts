import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
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
        const user = await this.validateUser(dto);

        return this.generateToken(user);
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

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            login: user.login,
            full_name: user.full_name,
            active: user.active,
            email_confirmed: user.email_confirmed,
            banned: user.banned,
            roles: [...user.roles.map(role => role.value)],
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(dto: LoginDto) {
        const {
            email,
            login,
            password
        } = dto;

        if (!email && !login) {
            throw new UnauthorizedException({message: 'Введите почтовый адрес или логин'});
        }

        if (!password) {
            throw new UnauthorizedException({message: 'Введите пароль'});
        }

        let user: User;

        if (email) {
            user = await this.userService.getUserByEmail(email);

            if (!user) {
                throw new UnauthorizedException({message: "Пользователь с таким почтовым адресом не найден"});
            }
        }

        if (login) {
            user = await this.userService.getUserByLogin(login);

            if (!user) {
                throw new UnauthorizedException({message: "Пользователь с таким логином не найден"});
            }
        }

        if (Object.keys(user).length > 0) {
            const passwordEquals = await bcrypt.compare(password, user.password);
            if (!passwordEquals) {
                throw new UnauthorizedException({message: "Введен неправильный пароль"});
            }

            return user;
        }
    }
}
