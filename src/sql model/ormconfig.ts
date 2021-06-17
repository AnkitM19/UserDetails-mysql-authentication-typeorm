/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeorm:TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: 'welcome@1',
  database: 'users',
  entities: ['Users'],
  autoLoadEntities: true,
  synchronize: true,
};
