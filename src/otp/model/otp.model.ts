import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
interface OtpAttr {
  id: string;
  otp: string;
  expiration_time: Date;
  verified: boolean;
  check: string;
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttr> {
  @ApiProperty({
    example: '1212',
    description: 'OTP ID',
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ApiProperty({
    example: '1212',
    description: 'OTP ID',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @ApiProperty({
    example: '1212',
    description: 'OTP ID',
  })
  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @ApiProperty({
    example: '1212',
    description: 'OTP ID',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @ApiProperty({
    example: '1212',
    description: 'OTP ID',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  check: string;
}
