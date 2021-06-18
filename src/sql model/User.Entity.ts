/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users  {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({type:"varchar"})
  Name: string;

  @Column({type:"varchar"})
  userName: string;

  @Column({type:"varchar"})
  password: string;
  
  @Column({type:"varchar"})
  phnNumber: string;
  
  @Column({type:"varchar",unique: true})
  emailId: string;
}
