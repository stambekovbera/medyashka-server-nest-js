import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt } from 'passport-jwt';
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService
	) {
	}


	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();

		try {
			const xAuthTokenJwtParser = ExtractJwt.fromHeader('x-auth-token');
			const authorizationJwtParser = ExtractJwt.fromHeader('authorization');
			const token = xAuthTokenJwtParser(request) || authorizationJwtParser(request);

			if (!token) {
				throw new UnauthorizedException({ message: "Некорректный токен" });
			}

			request.user = this.jwtService.verify(token);

			return true;
		} catch (error) {
			throw new UnauthorizedException({ message: error?.response?.message || "Пользователь не авторизован" });
		}
	}
}