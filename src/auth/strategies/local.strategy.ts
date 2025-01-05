import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'reg_no',
    });
  }

  async validate(reg_no: string, password: string) {
    console.log(reg_no);
    const user = await this.authService.validateUser(reg_no, password);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
