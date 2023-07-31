import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class CreateUserDto {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Momininov', description: 'Foydalnuvchi familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalnuvchi familiyasi' })
  @IsString()
  username: string;

  @ApiProperty({ example: 1, description: 'Unique ID' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({ example: 1, description: 'Unique ID' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'asdfa@gmail.com', description: 'Unique ID' })
  @IsString()
  email: string;

  @ApiProperty({ example: '+12345678', description: 'Unique ID' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: '01.01.23', description: 'Unique ID' })
  @IsDateString()
  birthday: Date;
}
