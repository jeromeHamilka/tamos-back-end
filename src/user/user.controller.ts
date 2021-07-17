import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
}
