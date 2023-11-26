import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Period, Periods } from './models/period.model';
import { RegularFinancialOperation } from './models/regualar-financial-operation.model';
import { SingularFinancialOperation } from './models/singular-financial-operation.model';
import { AddSingularFinancialOperationDto } from './dto/add-singular-financial-operation.dto';
import { AddRegularFinancialOperationDto } from './dto/add-regular-financial-operation.dto';
import { MonthSummaryDto } from './dto/month-summary.dto';
import { Op } from 'sequelize';
import * as dayjs from 'dayjs'

@Injectable()
export class FinancialOperationsService {
  constructor(
    @InjectModel(Period) private readonly periodsRepo: typeof Period,
    @InjectModel(RegularFinancialOperation) private readonly regularFinancialOperationsRepo: typeof RegularFinancialOperation,
    @InjectModel(SingularFinancialOperation) private readonly singularFinancialOperationsRepo: typeof SingularFinancialOperation,
  ) {}

  private userId: number;

  setUserId(userId) {
    this.userId = userId
  }

  async addSingularFinancialOperation(financialOperationDto: AddSingularFinancialOperationDto) {
    return await this.singularFinancialOperationsRepo.create({ ...financialOperationDto, userId: this.userId })
  }

  async addRegularFinancialOperation(financialOperationDto: AddRegularFinancialOperationDto) {
    return await this.regularFinancialOperationsRepo.create({ ...financialOperationDto, userId: this.userId })
  }

  async getPeriods() {
    return await this.periodsRepo.findAll();
  }

  private async getMonthSingularFinancialOperationsSummary(month: number, year: number) {
    const monthObject = dayjs(`${month}-1-${year}`, 'M-D-YYYY')

    const singularIncome = await this.singularFinancialOperationsRepo.sum('sum', {
      where: {
        date: {
          [Op.gte]: monthObject.startOf('month').format('YYYY-MM-DD'),
          [Op.lte]: monthObject.endOf('month').format('YYYY-MM-DD')
        },
        isIncome: true,
        userId: this.userId
      }
    })

    const singularExpense = await this.singularFinancialOperationsRepo.sum('sum', {
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

  private async getMonthRegularFinancialOperationsSummary(month: number) {
    const regularFinancialOperations = await this.regularFinancialOperationsRepo.findAll({
      where: {
        userId: this.userId
      },
      include: [Period]
    });

    let regularIncome = 0 // eslint-disable-line prefer-const
    let regularExpense = 0 // eslint-disable-line prefer-const

    regularFinancialOperations.filter(item => item.isIncome).forEach(item => {
      switch (item.period.id) {
        case Periods.month:
          regularIncome += item.sum
          break
        case Periods.quarter:
          if ([3, 6, 9, 12].includes(month)) regularIncome += item.sum
          break
        case Periods.year:
          if (month === 12) regularIncome += item.sum
          break
      }
    })

    regularFinancialOperations.filter(item => !item.isIncome).forEach(item => {
      switch (item.period.id) {
        case Periods.month:
          regularExpense += item.sum
          break
        case Periods.quarter:
          if ([3, 6, 9, 12].includes(month)) regularExpense += item.sum
          break
        case Periods.year:
          if (month === 12) regularExpense += item.sum
          break
      }
    })

    return { regularIncome, regularExpense }
  }

  private async getAggregatedMonthSummary(month: number, year: number, prevSummary?: MonthSummaryDto) {
    const { singularIncome, singularExpense } = await this.getMonthSingularFinancialOperationsSummary(month, year)
    const { regularIncome, regularExpense } = await this.getMonthRegularFinancialOperationsSummary(month)

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
    const { singularIncome, singularExpense } = await this.getMonthSingularFinancialOperationsSummary(month, year)
    const { regularIncome, regularExpense } = await this.getMonthRegularFinancialOperationsSummary(month)

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
