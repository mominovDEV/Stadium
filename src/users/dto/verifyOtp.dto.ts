import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class VeifyOtpDto {
  @IsString()
  @IsNotEmpty()
  check: string;

  @IsString()
  @IsNotEmpty()
  veification_key: string;

  @IsNumberString()
  otp: string;
}
