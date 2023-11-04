import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddRegularBudgetItemDto {
  @ApiProperty({ example: '1000', description: 'Сумма' })
  @IsNumber()
  readonly sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @IsBoolean({ message: 'Должно быть строкой' })
  readonly isIncome: boolean;

  @IsNumber()
  @ApiProperty({ example: '1', description: 'ID периода' })
  readonly periodId: number;

  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'Стипа)))', description: 'Название' })
  readonly name: string;
}