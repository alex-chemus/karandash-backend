import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetMonthOperations {
  @ApiProperty({ example: '2023', description: 'Год' })
  @IsNumber()
  readonly year: number;

  @ApiProperty({ example: '1', description: 'Месяц (1-12)' })
  @IsNumber()
  readonly month: number;
}