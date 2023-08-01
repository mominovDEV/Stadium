import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
interface comfort_stadiumAttrs {
  stadium_id: number;
}
@Table({ tableName: 'comfort_stadium' })
export class ComfortStadium extends Model<
  ComfortStadium,
  comfort_stadiumAttrs
> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
  })
  stadium_id: string;
}
