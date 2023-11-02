import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class MonthSummary {
  @ApiProperty({ example: '1', description: 'Месяц (1-12)' })
  @IsNumber()
  readonly month: number;

  @ApiProperty({ example: '1000', description: 'Доход' })
  @IsNumber()
  readonly income: number;

  @ApiProperty({ example: '1000', description: 'Расход' })
  @IsNumber()
  readonly expense: number;

  @ApiProperty({ example: '1000', description: 'Сальдо' })
  @IsNumber()
  readonly diff: number;
}