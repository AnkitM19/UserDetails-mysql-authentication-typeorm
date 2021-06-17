import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm } from 'src/sql model/ormconfig';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeorm), UserModule],
})
export class AppModule {}
