import { IsStrongPassword, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user123@mail.ru', description: 'user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'p@s5W0rd', description: 'user email' })
  @IsStrongPassword()
  password: string;
}
