/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  Name: string

  @IsString()
  @IsNotEmpty({message:'Please Enter Valid UserName'})
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8,32)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  {message:'password is too weak'})
  password: string;

  @Length(0, 10)
  @IsNotEmpty({message:'Please Enter Phone Number'})
  phnNumber: string;

  @IsEmail()
  @IsNotEmpty({message:'Please Enter Valid EmailId'})
  emailId: string;
}
