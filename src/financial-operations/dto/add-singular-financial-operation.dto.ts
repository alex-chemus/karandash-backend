import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddSingularFinancialOperationDto {
  @ApiProperty({ example: '1000', description: 'Сумма' })
  @IsNumber()
  readonly sum: number;

  @ApiProperty({ example: 'true', description: 'Доход/расход' })
  @IsBoolean({ message: 'Должно быть строкой' })
  readonly isIncome: boolean;

  @IsString({ message: 'Должно быть датой в формате YYYY-MM-DD' })
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Дата' })
  readonly date: string;

  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'Стипа)))', description: 'Название' })
  readonly name: string;

  @ApiPropertyOptional({ example: 1, description: 'ID заметки' })
  @IsNumber()
  readonly noteId?: number;
}
