import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PeriodCreationAttrs {
  title: string;
}

@Table({ tableName: 'periods', timestamps: false })
export class Period extends Model<Period, PeriodCreationAttrs> {  
  @ApiProperty({ example: '1', description: 'ID периода' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Месяц', description: 'Период' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
}