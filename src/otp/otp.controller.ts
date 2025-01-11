import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { Public } from 'decorators/public.decorator';
import { VerifyOtpDto } from './dto/verify-otp.dto';
@Public()
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/send')
  sendOTP(@Body() payload: SendOtpDto) {
    return this.otpService.sendOtp(payload.phone_no);
  }
  @Post('/verify')
  verifyOTP(@Body() payload: VerifyOtpDto) {
    return this.otpService.verifyOtp(payload);
  }
}
