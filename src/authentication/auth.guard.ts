/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearerToken = request.headers.authorization;
      if (!bearerToken) {
        return false;
      } const Token = bearerToken.split('Bearer ')[1];
      Token.trim();
      const Verification = this.jwtService.verify(Token, { secret: 'topSecret51' });
      if (Verification) {
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException(' ');

    }
    return false;
  }
}

