import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.gaurd';
import { LoginDto } from 'src/dto/Auth.dto';
import { UpdateUserDto } from 'src/dto/updateUserDto';
import { UserDto } from 'src/dto/UserDto';
import { UserService } from '../Service/user.service';
@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  public signUp(@Body() user: UserDto) {
    return this.userService.signUp(user);
  }
  @Post('/signin')
  public signIn(@Body() user: LoginDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(user);
  }
  @Post('/test')
  @UseGuards(new AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
  @Get()
  @UseGuards(new AuthGuard())
  getAllUser() {
    return this.userService.findAll();
  }
  @Get(':id')
  @UseGuards(new AuthGuard())
  getSingleUser(@Param('id') UserId: string) {
    return this.userService.findOne(UserId);
  }
  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteUser(@Param('id') USerId: string) {
    return this.userService.remove(USerId);
  }
  @Put(':id')
  @UseGuards(new AuthGuard())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
