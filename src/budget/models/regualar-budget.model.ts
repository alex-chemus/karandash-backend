import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Period } from "./period.model";
import { User } from "src/users/users.model";

interface RegularBudgetCreationAttrs {
  sum: number;
  isIncome: boolean;
  periodId: number;
  userId: number;
}

@Table({ tableName: 'regular budget', timestamps: false })
export class RegularBudget extends Model<RegularBudget, RegularBudgetCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID записи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1000', description: 'Сумма' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isIncome: boolean;

  @ApiProperty({ example: 'Стипа)))', description: 'Название' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'ID период' })
  @ForeignKey(() => Period)
  periodId: number;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => Period, 'periodId')
  period: Period;

  @BelongsTo(() => User, 'userId')
  user: User;
}