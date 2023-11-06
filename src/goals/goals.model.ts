import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface GoalCreationAttrs {
  name: string;
  sum: number;
  year: number;
  userId: number;
}

@Table({ tableName: 'goals', timestamps: false })
export class Goal extends Model<Goal, GoalCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID цели' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'На путешествие', description: 'Название' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '100000', description: 'Сумма' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  sum: number;

  @ApiProperty({ example: '2023', description: 'Год' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}