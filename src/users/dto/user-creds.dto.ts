import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCredsDto {
  @ApiProperty({ example: 'admin', description: 'Логин пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
