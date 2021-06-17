/* eslint-disable prettier/prettier */
import { Length } from "class-validator";

export class UpdateUserDto {
  userName: string;
  
  @Length(0,10)
  phnNumber: string;
}
