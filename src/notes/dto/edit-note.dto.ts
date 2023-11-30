import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EditNoteDto {
  @ApiProperty({ example: '1', description: 'ID заметки' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'yyyy-MM-dd', description: 'Дата заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly date: string;

  @ApiProperty({ example: 'Текст', description: 'Текст заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;
}
