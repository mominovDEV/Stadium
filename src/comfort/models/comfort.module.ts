import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface comfortAttrs {
  name: string;
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, comfortAttrs> {
  @ApiProperty({
    example: 'Mardon',
    description: 'Stadion qandachalik comfortlikdaligi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
