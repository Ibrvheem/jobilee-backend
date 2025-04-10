import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import { AcceptOrDeclineTaskDto } from './dto/accept-or-decline-task.dto';
import { UserBindingContextImpl } from 'twilio/lib/rest/ipMessaging/v2/service/user/userBinding';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@User() user, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.userId, createTaskDto);
  }

  @Post('cancel')
  cancel(@User() user, @Body() acceptOrDeclineTaskDto: AcceptOrDeclineTaskDto) {
    return this.tasksService.cancelTask(
      user.userId,
      acceptOrDeclineTaskDto.taskId,
    );
  }

  @Post('accept')
  acceptTask(
    @User() user,
    @Body() acceptOrDeclineTaskDto: AcceptOrDeclineTaskDto,
  ) {
    return this.tasksService.acceptTask(
      user.userId,
      acceptOrDeclineTaskDto.taskId,
    );
  }

  @Post('decline')
  declineTask(
    @User() user,
    @Body() acceptOrDeclineTaskDto: AcceptOrDeclineTaskDto,
  ) {
    return this.tasksService.declineTask(
      user.userId,
      acceptOrDeclineTaskDto.taskId,
    );
  }

  @Get('by-you')
  byYou(@User() user) {
    return this.tasksService.getYours(user.userId);
  }

  @Get('for-you')
  async forYou(@User() user) {
    const tasks = await this.tasksService.forYou(user.userId);
    return tasks;
  }
  @Get('available')
  async findAvailable(@User() user) {
    const tasks = await this.tasksService.getAvailableTask(user.userId);

    return tasks;
  }
  @Get('to-do')
  async findYourTodo(@User() user) {
    const tasks = await this.tasksService.getYourTodo(user.userId);
    return tasks;
  }
  @Get('accepted')
  async yourTaskAcceptedByOthers(@User() user) {
    const tasks = await this.tasksService.yourTaskAcceptedByOthers(user.userId);
    return tasks;
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
