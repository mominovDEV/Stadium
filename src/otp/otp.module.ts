import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { Otp } from './model/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
