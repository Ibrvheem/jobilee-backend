import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() payload: CreateUserDto) {
    return this.authService.register(payload);
  }
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
