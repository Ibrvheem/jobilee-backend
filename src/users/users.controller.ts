import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'decorators/user.decorator';
import { UpdateUserDto } from './dto/update-auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAll() {
    const users = await this.usersService.getUsers();
    return users;
  }
  @Get('/me')
  async getCurrentUser(@User() user) {
    return await this.usersService.getMe(user.userId);
  }

  @Patch('/update-profile')
  async updateUserProfile(@User() user, @Body() payload: UpdateUserDto) {
    return await this.usersService.updateUser(payload, user.userId);
  }
}
