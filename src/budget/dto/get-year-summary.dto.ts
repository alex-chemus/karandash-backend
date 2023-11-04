import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetYearSummaryDto {
  @ApiProperty({ example: 2023, description: 'Год' })
  @IsNumber()
  year: number;
}