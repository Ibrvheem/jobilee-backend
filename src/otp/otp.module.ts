import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Module({
  controllers: [OtpController],
  providers: [
    OtpService,
    {
      provide: Twilio, // Register Twilio SDK
      useFactory: (configService: ConfigService) => {
        const accountSid = configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = configService.get<string>('TWILIO_AUTH_TOKEN');
        return new Twilio(accountSid, authToken);
      },
      inject: [ConfigService], // Inject ConfigService into the factory
    },
  ],
  imports: [],
})
export class OtpModule {}
