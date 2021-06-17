import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../Service/user.service';
import { UserRepository } from 'src/sql model/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [TypeOrmModule, JwtStrategy],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
