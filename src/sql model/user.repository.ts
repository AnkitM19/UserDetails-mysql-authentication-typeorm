/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Users } from './User.Entity';
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    
}