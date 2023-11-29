import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class OperationsListItem {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: true, description: 'Доход/расход' })
  @IsBoolean()
  readonly isIncome: boolean;

  @ApiProperty({ example: '1000', description: 'Сумма' })
  @IsNumber()
  readonly sum: number;

  @ApiProperty({ example: 'Название', description: 'Название' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Тип операции', description: 'Тип операции' })
  @IsString()
  readonly operationType: 'regular' | 'singular';
}