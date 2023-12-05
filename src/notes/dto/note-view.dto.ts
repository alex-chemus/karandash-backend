import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { SingularFinancialOperation } from "src/financial-operations/models/singular-financial-operation.model";

export class NoteViewDto {
  @ApiProperty({ example: '1', description: 'ID заметки' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'yyyy-MM-dd', description: 'Дата заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly date: string;

  @ApiProperty({ example: 'Текст', description: 'Текст заметки' })
  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;

  @ApiProperty({ example: {}, description: 'Разовые единичные операции', type: [SingularFinancialOperation] })
  readonly singularFinancialOperations: SingularFinancialOperation[];

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @IsNumber()
  readonly userId: number;
}