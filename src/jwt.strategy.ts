/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './Interfaces/jwt.payload.interface';
import { Users } from './sql model/User.Entity';
import { UserRepository } from './sql model/user.repository';

@Injectable()
export class JwtStrategy {
  
    constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    ({
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
