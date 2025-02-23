import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { AssetDTO } from 'src/commons/dto/asset.dto';

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

  @IsArray()
  @IsOptional()
  assets: AssetDTO;
}
