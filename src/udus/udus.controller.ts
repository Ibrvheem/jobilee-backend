import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UdusService } from './udus.service';
import { CreateUdusDto } from './dto/create-udus.dto';
import { UpdateUdusDto } from './dto/update-udus.dto';
import { Public } from 'decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { REGSTATUS } from 'src/users/types';

@Controller('udus')
@Public()
export class UdusController {
  constructor(
    private readonly udusService: UdusService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() { reg_no }: { reg_no: string }) {
    try {
      const user = await this.userService.findUserByRegNo(reg_no.toLowerCase());

      if (user && user.status === REGSTATUS.OTP_VERIFIED) {
        throw new BadRequestException('User Already Exist');
      }
      const student = await this.udusService.findOneByRegNo(reg_no);
      if (!student) {
        throw new NotFoundException(`Student with ${reg_no} does not exist`);
      }

      return student;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get()
  findAll() {
    return this.udusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.udusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUdusDto: UpdateUdusDto) {
    return this.udusService.update(+id, updateUdusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.udusService.remove(+id);
  }
}
