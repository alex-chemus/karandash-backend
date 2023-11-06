import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class GoalsChartItem {
  @ApiProperty({ example: '1', description: 'ID цели' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'На путешествие', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @ApiProperty({ example: '100000', description: 'Сумма' })
  @IsNumber()
  sum: number;
}