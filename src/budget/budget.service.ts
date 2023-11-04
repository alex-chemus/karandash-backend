import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Period, Periods } from './models/period.model';
import { RegularBudget } from './models/regualar-budget.model';
import { SingularBudget } from './models/singular-budget.model';
import { AddSingularBudgetItemDto } from './dto/add-singular-budget-item.dto';
import { AddRegularBudgetItemDto } from './dto/add-regular-budget-item.dto';
import { MonthSummaryDto } from './dto/month-summary.dto';
import { Op } from 'sequelize';
import * as dayjs from 'dayjs'

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Period) private readonly periodsRepo: typeof Period,
    @InjectModel(RegularBudget) private readonly regularBudgetRepo: typeof RegularBudget,
    @InjectModel(SingularBudget) private readonly singularBudgetRepo: typeof SingularBudget,
  ) {}

  private userId: number;

  setUserId(userId) {
    this.userId = userId
  }

  async addSingularBudgetItem(budgetDto: AddSingularBudgetItemDto) {
    return await this.singularBudgetRepo.create({ ...budgetDto, userId: this.userId })
  }

  async addRegularBudgetItem(budgetDto: AddRegularBudgetItemDto) {
    return await this.regularBudgetRepo.create({ ...budgetDto, userId: this.userId })
  }

  async getPeriods() {
    return await this.periodsRepo.findAll();
  }

  private async getMonthSingularBudgetSummary(month: number, year: number) {
    const monthObject = dayjs(`${month}-1-${year}`, 'M-D-YYYY')

    const singularIncome = await this.singularBudgetRepo.sum('sum', {
      where: {
        date: {
          [Op.gte]: monthObject.startOf('month').format('YYYY-MM-DD'),
          [Op.lte]: monthObject.endOf('month').format('YYYY-MM-DD')
        },
        isIncome: true,
        userId: this.userId
      }
    })

    const singularExpense = await this.singularBudgetRepo.sum('sum', {
      where: {
        date: {
          [Op.gte]: monthObject.startOf('month').format('YYYY-MM-DD'),
          [Op.lte]: monthObject.endOf('month').format('YYYY-MM-DD')
        },
        isIncome: false,
        userId: this.userId
      }
    })

    return { singularIncome, singularExpense }
  }

  private async getMonthRegularBudgetSummary(month: number) {
    const regularBudgetItems = await this.regularBudgetRepo.findAll({
      where: {
        userId: this.userId
      },
      include: [Period]
    });

    let regularIncome = 0 // eslint-disable-line prefer-const
    let regularExpense = 0 // eslint-disable-line prefer-const

    regularBudgetItems.filter(item => item.isIncome).forEach(budgetItem => {
      switch (budgetItem.period.id) {
        case Periods.month:
          regularIncome += budgetItem.sum
          break
        case Periods.quarter:
          if ([3, 6, 9, 12].includes(month)) regularIncome += budgetItem.sum
          break
        case Periods.year:
          if (month === 12) regularIncome += budgetItem.sum
          break
      }
    })

    regularBudgetItems.filter(item => !item.isIncome).forEach(budgetItem => {
      switch (budgetItem.period.id) {
        case Periods.month:
          regularExpense += budgetItem.sum
          break
        case Periods.quarter:
          if ([3, 6, 9, 12].includes(month)) regularExpense += budgetItem.sum
          break
        case Periods.year:
          if (month === 12) regularExpense += budgetItem.sum
          break
      }
    })

    return { regularIncome, regularExpense }
  }

  private async getAggregatedMonthSummary(month: number, year: number, prevSummary?: MonthSummaryDto) {
    const { singularIncome, singularExpense } = await this.getMonthSingularBudgetSummary(month, year)
    const { regularIncome, regularExpense } = await this.getMonthRegularBudgetSummary(month)

    const income = singularIncome + regularIncome + (prevSummary?.income ?? 0)
    const expense = singularExpense + regularExpense + (prevSummary?.expense ?? 0)
    const diff = income - expense

    return { month, income, expense, diff }
  }

  async getAggregatedYearSummary(year: number) {
    const summary: MonthSummaryDto[] = []

    for (let i=0; i < 12; i++)
      summary.push(await this.getAggregatedMonthSummary(i+1, year, summary[i-1]))

    return summary
  }

  private async getPlainMonthSummary(month: number, year: number) {
    const { singularIncome, singularExpense } = await this.getMonthSingularBudgetSummary(month, year)
    const { regularIncome, regularExpense } = await this.getMonthRegularBudgetSummary(month)

    const income = singularIncome + regularIncome
    const expense = singularExpense + regularExpense
    const diff = income - expense

    return { month, income, expense, diff }
  }

  async getPlainYearSummary(year: number) {
    const summary: MonthSummaryDto[] = []

    for (let i=1; i <= 12; i++)
      summary.push(await this.getPlainMonthSummary(i, year))

    return summary
  }
}
