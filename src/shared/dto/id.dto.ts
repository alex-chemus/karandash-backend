import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdDto {
  @ApiProperty({ example: 1, description: 'ID' })
  @IsNumber()
  id: number;
}
