import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Period } from './models/period.model';
import { RegularBudget } from './models/regualar-budget.model';
import { SingularBudget } from './models/singular-budget.model';
import { AddSingularBudgetItemDto } from './dto/add-singular-budget-item.dto';
import { AddRegularBudgetItemDto } from './dto/add-regular-budget-item.dto';
import { MonthSummary } from './dto/month-summary.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Period) private readonly periodsRepo: typeof Period,
    @InjectModel(RegularBudget) private readonly regularBudgetRepo: typeof RegularBudget,
    @InjectModel(SingularBudget) private readonly singularBudgetRepo: typeof SingularBudget,
  ) {}

  async addSingularBudgetItem(budgetDto: AddSingularBudgetItemDto) {
    return await this.singularBudgetRepo.create(budgetDto)
  }

  async addRegularBudgetItem(budgetDto: AddRegularBudgetItemDto) {
    return await this.regularBudgetRepo.create(budgetDto)
  }

  async getPeriods() {
    return await this.periodsRepo.findAll();
  }

   // eslint-disable-next-line
  private async getMonthSummary(month: number) {
    return new MonthSummary()
  }

  async getSummary() {
    const summary: MonthSummary[] = []
    for (let i=1; i <= 12; i++)
      summary.push(await this.getMonthSummary(i))
    return summary
  }
}
