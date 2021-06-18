/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '../sql model/User.Entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../sql model/user.repository';
import { UserDto } from 'src/dto/UserDto';
import { UpdateUserDto } from 'src/dto/updateUserDto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/Auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/Interfaces/jwt.payload.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: UserDto): Promise<Users> {
    debugger;
    const { Name, userName, password, phnNumber, emailId } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); //encrypting password
    const user: Users = this.userRepo.create({
      Name,
      userName,
      password: hashedPassword,
      phnNumber,
      emailId,
    });
    await this.userRepo.save(user);
    return user;
  }
  async signIn(authDto: LoginDto): Promise<{ accessToken: string }> {
    const { emailId, password } = authDto;
    const user = await this.userRepo.findOne({ emailId });
    const compare = await bcrypt.compare(password, user.password);
    if (user && compare) {
      const payload: JwtPayload = { emailId };
      const accessToken: string = await this.jwtService.sign(payload); //checking user validity
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid username and password');
    }
  }

  findAll(): Promise<Users[]> {
    if (!Users) {
      throw new NotFoundException('Not Found');
    } else return this.userRepo.find();
  }
  findOne(id: string): Promise<Users> {
    if (!id) {
      throw new NotFoundException('User Not Found');
    } else return this.userRepo.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<Users> {
    const userUpdate = await this.userRepo.findOne(id);
    if (!userUpdate) {
      throw new NotFoundException('User Not found');
    } else {
      const { userName, phnNumber } = UpdateUserDto; //updating user information
      userUpdate.userName = userName;
      userUpdate.phnNumber = phnNumber;
      const update = await this.userRepo.save(userUpdate);
      return update;
    }
  }
}
