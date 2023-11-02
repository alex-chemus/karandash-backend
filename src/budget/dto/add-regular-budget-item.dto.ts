import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRegularBudgetItemDto {
  @ApiProperty({ example: '1000', description: 'Сумма' })
  @IsNumber()
  readonly sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @IsString({ message: 'Должно быть строкой' })
  readonly isIncome: boolean;

  @IsNumber()
  @ApiProperty({ example: '1', description: 'ID периода' })
  readonly periodId: number;
}