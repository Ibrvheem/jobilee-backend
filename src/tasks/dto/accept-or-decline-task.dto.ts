import { IsString } from 'class-validator';

export class AcceptOrDeclineTaskDto {
  @IsString()
  taskId: string;
}
