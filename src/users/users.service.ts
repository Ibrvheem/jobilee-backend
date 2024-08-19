import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByEmail(email: string) {
    const user = await this.databaseService.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
  async createUser(payload: CreateUserDto) {
    const user = await this.databaseService.user.create({ data: payload });
    return user;
  }

  async updateUser(payload: UpdateUserDto, userId: string) {
    const user = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });
    return user;
  }
  async getUsers() {
    return await this.databaseService.user.findMany({});
  }

  async getMe(id) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.databaseService.user.findFirst({
      where: {
        id,
      },
    });
    if (!rest) {
      throw new BadRequestException('User not found');
    }
    return rest;
  }
}
