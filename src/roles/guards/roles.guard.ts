import {CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt} from 'passport-jwt';
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles-auth.decorator";

export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            const request = context.switchToHttp().getRequest();

            const xAuthTokenJwtParser = ExtractJwt.fromHeader('x-auth-token');
            const authorizationJwtParser = ExtractJwt.fromHeader('authorization');
            const token =
                xAuthTokenJwtParser(request) || authorizationJwtParser(request);

            if (!token) {
                throw new UnauthorizedException({message: "Некорректный токен"});
            }

            request.user = this.jwtService.verify(token);

            return request.user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('У пользователя нет прав', HttpStatus.FORBIDDEN);
        }
    }

}