import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

const datePattern = /\d\d\d\d-\d\d-\d\d/;

export class DateRangeDto {
  @ApiProperty({ example: 'yyyy-MM-dd', description: 'Начало диапазона' })
  @Matches(datePattern)
  start: string;

  @ApiProperty({ example: 'yyyy-MM-dd', description: 'Конец диапазона' })
  @Matches(datePattern)
  end: string;
}
