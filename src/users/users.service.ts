import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  async getUsers() {
    return await this.databaseService.user.findMany({});
  }
}
