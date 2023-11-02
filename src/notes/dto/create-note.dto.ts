import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoteDto {
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
