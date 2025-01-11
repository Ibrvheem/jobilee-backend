import { Injectable } from '@nestjs/common';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
  public constructor(
    private twilioClient: Twilio,
    private configService: ConfigService,
  ) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }
  async sendOtp(phoneNumber: string) {
    const serviceSid = this.configService.get<string>('TWILIO_SERVICE_SID');
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((verification) => (msg = verification.status));
    return { msg: msg };
  }

  async verifyOtp(data: VerifyOtpDto) {
    const serviceSid = this.configService.get('TWILIO_SERVICE_SID');
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: data.phone_no, code: data.code })
      .then((verification) => (msg = verification.status));
    return { msg: msg };
  }
}
