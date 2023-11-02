import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class AddSingularBudgetItemDto {
  @ApiProperty({ example: '1000', description: 'Сумма' })
  @IsNumber()
  readonly sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @IsString({ message: 'Должно быть строкой' })
  readonly isIncome: boolean;

  @IsDate({ message: 'Должно быть датой в формате YYYY-MM-DD' })
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Дата' })
  readonly date: string;
}