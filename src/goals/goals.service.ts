import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goal } from './goals.model';
import { AddGoalDto } from './dto/add-goal.dto';

@Injectable()
export class GoalsService {
  private userId: number

  constructor(@InjectModel(Goal) private readonly goalsRepo: typeof Goal) {}

  setUserId(userId: number) {
    this.userId = userId
  }

  async addGoal(addGoalDto: AddGoalDto) {
    return await this.goalsRepo.create({ ...addGoalDto, userId: this.userId })
  }

  async getGoals(year: number) {
    return await this.goalsRepo.findAll({
      where: {
        userId: this.userId,
        year
      }
    })
  }
}
