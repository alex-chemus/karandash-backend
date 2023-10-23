import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UserCredsDto } from 'src/users/dto/user-creds.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: UserCredsDto) {
    const user = await this.validateUser(userDto);
    return this.jwtService.sign({ id: user.id });
  }

  async register(userDto: UserCredsDto) {
    const credsInUse = await this.usersService.credsInUse(userDto);
    if (credsInUse)
      throw new HttpException(
        'Логин или пароль не могут быть использованы',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.jwtService.sign({ id: user.id });
  }

  private async validateUser(userDto: UserCredsDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals && user) return user;
    else
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
  }
}
