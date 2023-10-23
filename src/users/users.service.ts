import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserCredsDto } from './dto/user-creds.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly usersRepo: typeof User) {}

  async createUser(dto: UserCredsDto) {
    return await this.usersRepo.create(dto);
  }

  async getUserByLogin(login: string) {
    return await this.usersRepo.findOne({ where: { login } });
  }

  async credsInUse(dto: UserCredsDto) {
    const count = await this.usersRepo.count({
      where: { [Op.or]: { login: dto.login, password: dto.password } },
    });
    return count !== 0;
  }
}
