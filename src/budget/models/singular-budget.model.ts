import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface SingularBudgetCreationAttrs {
  sum: number;
  isIncome: boolean;
  date: string;
  userId: number;
}

@Table({ tableName: 'regular budget', timestamps: false })
export class SingularBudget extends Model<SingularBudget, SingularBudgetCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID записи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1000', description: 'Сумма' })
  @Column({ type: DataType.NUMBER, allowNull: false })
  sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isIncome: boolean;

  @ApiProperty({ example: '1', description: 'Дата' })
  @Column({ type: DataType.DATE, allowNull: false })
  date: number;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}