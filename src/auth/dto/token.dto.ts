import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class TokenDto {
  @ApiProperty({ example: 'token', description: 'auth token' })
  @IsString({ message: 'Должно быть строкой' })
  token: string
}