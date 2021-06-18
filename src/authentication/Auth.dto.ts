/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
export class LoginDto {
    @IsEmail()
    @IsNotEmpty({ message: 'Please Enter Valid EmailId' })
    emailId: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 32)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        { message: 'password is too weak' })

    password: string;
}
