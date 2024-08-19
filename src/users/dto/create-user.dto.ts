import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
