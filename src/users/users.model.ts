import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Note } from 'src/notes/notes.model';

interface UserCreationAttrs {
  login: string;
  password: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Логин пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  password: string;

  @HasMany(() => Note)
  notes: Note[];
}
