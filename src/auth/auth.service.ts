import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDto) {
    const isUser = await this.userService.findUserByEmail(payload.email);
    if (isUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await this.userService.createUser({ ...payload, password: hashedPassword });
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
  async login(user: User) {
    const payload = { email: user.email, password: user.password };
    return { access_token: this.jwtService.sign(payload) };
  }
}
