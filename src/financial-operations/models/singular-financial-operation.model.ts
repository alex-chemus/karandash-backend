import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Note } from "src/notes/notes.model";
import { User } from "src/users/users.model";

interface SingularFinancialOperationCreationAttrs {
  sum: number;
  isIncome: boolean;
  date: string;
  userId: number;
}

@Table({ tableName: 'singular financial operation', timestamps: false })
export class SingularFinancialOperation extends Model<SingularFinancialOperation, SingularFinancialOperationCreationAttrs> {
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

  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Дата' })
  @Column({ type: DataType.DATE, allowNull: false })
  date: string;

  @ApiProperty({ example: 'Стипа)))', description: 'Название' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({ example: '1', description: 'ID заметки' })
  @ForeignKey(() => Note)
  noteId?: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Note, 'noteId')
  note: Note;
}