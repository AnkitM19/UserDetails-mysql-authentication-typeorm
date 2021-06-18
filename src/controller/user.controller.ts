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
// import { UserGuard } from 'src/auth module/auth.guard';
import { LoginDto } from 'src/authentication/Auth.dto';
import { UserGuard } from 'src/authentication/auth.guard';
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
  @UseGuards(UserGuard)
  test(@Req() req) {
    console.log(req);
  }
  @Get()
  @UseGuards(UserGuard)
  getAllUser(@Req() req) {
    console.log(req);
    return this.userService.findAll();
  }
  @Get(':id')
  @UseGuards(UserGuard)
  getSingleUser(@Param('id') UserId: string) {
    return this.userService.findOne(UserId);
  }
  @Delete(':id')
  @UseGuards(UserGuard)
  deleteUser(@Param('id') USerId: string) {
    return this.userService.remove(USerId);
  }
  @Put(':id')
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
