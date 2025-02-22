import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  incentive: number;

  @IsNumber()
  expires: number;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  visual_context: string;
}
