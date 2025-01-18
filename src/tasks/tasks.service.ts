import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { UsersService } from 'src/users/users.service';
import { SUCCESS } from 'constants/CustomResponses';
import { convertToKobo } from 'lib/helpers';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<Task>,
    private readonly usersService: UsersService,
  ) {}
  async create(id: string, payload: CreateTaskDto) {
    const user = await this.usersService.getMe(id);
    if (!user) {
      throw new NotFoundException(
        `User's id: ${id} is either incorrect or notfound`,
      );
    }
    try {
      const data = {
        ...payload,
        incentive: convertToKobo(payload.incentive),
        user_id: id,
      };
      const response = await this.taskModel.create(data);
      return SUCCESS;
    } catch (err) {
      console.error(`There was an error creating task: ${err}`);
    }
  }

  async getYours(userId) {
    try {
      const response = await this.taskModel.find({
        user_id: userId,
      });
      return response;
    } catch (err) {
      console.error(`There was an error creating task: ${err}`);
    }
  }

  async forYou(userId: string) {
    try {
      const response = await this.taskModel.find({
        user_id: { $ne: userId },
      });
      return response;
    } catch (err) {
      console.error(`There was an error creating task: ${err}`);
    }
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
