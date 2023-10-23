import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetNoteDto {
  @ApiProperty({ example: 1, description: 'ID заметки' })
  @IsNumber()
  id: number;
}
