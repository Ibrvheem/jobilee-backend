import { IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber()
  phone_no: string;
}
