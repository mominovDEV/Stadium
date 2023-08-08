import {
  IsStrongPassword,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneUserDto {
  @ApiProperty({
    example: '12345678',
    description: 'foydalanuvchi telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
