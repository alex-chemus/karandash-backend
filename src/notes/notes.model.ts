import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { SingularFinancialOperation } from 'src/financial-operations/models/singular-financial-operation.model';
import { User } from 'src/users/users.model';

interface NoteCreationAttrs {
  title: string;
  date: string;
  text: string;
  userId: number;
}

@Table({ tableName: 'notes', timestamps: false })
export class Note extends Model<Note, NoteCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID заметки' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок заметки' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'yyyy-MM-dd', description: 'Дата создания заметки' })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @ApiProperty({ example: 'Lorem ispum', description: 'Текст заметки' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => SingularFinancialOperation)
  singularFinancialOperations: SingularFinancialOperation[]
}
