import { Module } from '@nestjs/common';
import { UdusService } from './udus.service';
import { UdusController } from './udus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UdusSchema } from './udus.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [UdusController],
  providers: [UdusService, UsersModule],
  imports: [
    MongooseModule.forFeature([{ name: 'UDUS', schema: UdusSchema }]),
    UsersModule,
  ],
  exports: [UdusService, MongooseModule],
})
export class UdusModule {}
