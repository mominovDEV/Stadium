import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface BotAttrs {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  status: boolean;
}

@Table({ tableName: 'bot' })
export class Bot extends Model<Bot, BotAttrs> {
  @ApiProperty({
    example: 124356,
    description: 'user id',
  })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  user_id: number;
  @ApiProperty({
    example: 'sfdgfd',
    description: 'Mardon',
  })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'sfdgfd',
    description: 'Mardon',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;
  @ApiProperty({
    example: 'sfdgfd',
    description: 'Mardon',
  })
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({
    example: 'sfdgfd',
    description: 'Mardon',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  phone_number: string;
  @ApiProperty({
    example: 'sfdgfd',
    description: 'Mardon',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;
}
