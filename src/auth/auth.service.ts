import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(payload: CreateUserDto) {
    const isUser = await this.userService.findUserByEmail(payload.email);
    if (isUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await this.userService.createUser({ ...payload, password: hashedPassword });
  }
}
