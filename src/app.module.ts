import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'guards/jwt.guard';
import { UploadModule } from './upload/upload.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UdusModule } from './udus/udus.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dailypilot-dev-admin:$password1@dailypilot-dev.lor8c.mongodb.net/?retryWrites=true&w=majority&appName=DailyPilot-Dev',
    ),
    DatabaseModule,
    AuthModule,
    UsersModule,
    UdusModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TasksModule,
    // UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
