import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCredsDto } from 'src/users/dto/user-creds.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход в аккаунт', operationId: 'login' })
  @ApiResponse({ status: 200, type: String })
  @HttpCode(200)
  @Post('login')
  async login(@Body() userDto: UserCredsDto) {
    return await this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя', operationId: 'register' })
  @ApiResponse({ status: 200, type: String })
  @HttpCode(200)
  @Post('register')
  async register(@Body() userDto: UserCredsDto) {
    return await this.authService.register(userDto);
  }
}
