import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddGoalDto {
  @ApiProperty({ example: 'На путешествие', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @ApiProperty({ example: '100000', description: 'Сумма' })
  @IsNumber()
  sum: number;

  @ApiProperty({ example: '2023', description: 'Год' })
  @IsNumber()
  year: number;
}