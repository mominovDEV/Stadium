import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface UserAttrs {
  first_name: string;
  last_name: string;
  username: string;
  hashed_password: string;
  telegram_link: string;
  email: string;
  phone: string;
  user_phone: string;
  birthday: Date;
  is_owner: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalnuvchi familiyasi' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({ example: 'http./sdfh', description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({ example: 'asdfa@gmail.com', description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: '+12345678', description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: '345678678', description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  user_phone: string;

  @ApiProperty({ example: '01.01.23', description: 'Unique ID' })
  @Column({
    type: DataType.DATE,
  })
  birthday: Date;

  @ApiProperty({ example: 'false', description: 'Unique ID' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @ApiProperty({ example: 'false', description: 'Unique ID' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'token', description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
