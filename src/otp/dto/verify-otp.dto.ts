import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber()
  phone_no: string;

  @IsString()
  @Length(6, 6) // Adjust the length as needed
  code: string;
}
