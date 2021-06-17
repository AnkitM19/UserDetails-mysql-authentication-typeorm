/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './Interfaces/jwt.payload.interface';
import { Users } from './sql model/User.Entity';
import { UserRepository } from './sql model/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
    constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
        secretOrKey: 'topSecret51',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload):Promise<Users>{
      const{ emailId } = payload;
      const user: Users = await this.userRepository.findOne({emailId})
      if(!user){
          throw new UnauthorizedException();
      }
      return user;
  }
}
