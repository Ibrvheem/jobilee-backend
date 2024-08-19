import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'decorators/user.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@User() user, @UploadedFile() file: Express.Multer.File) {
    const filePath = `${user.userId}/${file.originalname}`;
    const response = await this.uploadService.upload({
      filePath,
      file: file.buffer,
    });
    return response;
  }
}
