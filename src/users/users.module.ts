import { BotModule } from './../bot/bot.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { Otp } from '../otp/model/otp.model';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    MailModule,
    OtpModule,
    BotModule,
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
