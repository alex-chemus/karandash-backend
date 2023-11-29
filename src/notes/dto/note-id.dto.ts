import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class NoteIdDto {
  @ApiProperty({ example: 1, description: 'ID заметки' })
  @IsNumber()
  id: number;
}
