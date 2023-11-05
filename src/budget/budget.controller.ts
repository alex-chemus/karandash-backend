import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { AddSingularBudgetItemDto } from './dto/add-singular-budget-item.dto';
import { AddRegularBudgetItemDto } from './dto/add-regular-budget-item.dto';
import { GetYearSummaryDto } from './dto/get-year-summary.dto';
import { SingularBudget } from './models/singular-budget.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegularBudget } from './models/regualar-budget.model';
import { MonthSummaryDto } from './dto/month-summary.dto';
import { Period } from './models/period.model';

@ApiTags('Budget')
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @ApiOperation({ summary: 'Добавить разовый доход/расход', operationId: 'addSingularBudgetItem' })
  @ApiResponse({ status: 200, type: SingularBudget })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('add-singular-budget-item')
  async addSingularBudgetItem(@Body() budgetItem: AddSingularBudgetItemDto, @Req() req) {
    this.budgetService.setUserId(req.user.id)
    return await this.budgetService.addSingularBudgetItem(budgetItem)
  }

  @ApiOperation({ summary: 'Добавить регулярный доход/расход', operationId: 'addRegularBudgetItem' })
  @ApiResponse({ status: 200, type: RegularBudget })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('add-regular-budget-item')
  async addRegularBudgetItem(@Body() budgetItem: AddRegularBudgetItemDto, @Req() req) {
    this.budgetService.setUserId(req.user.id)
    return await this.budgetService.addRegularBudgetItem(budgetItem)
  }

  /* todo: сделать удаление айтемов регулярного бюджета по айди */

  @ApiOperation({ summary: 'Итоговые данные за год с накоплением', operationId: 'getAggregatedYearSummary' })
  @ApiResponse({ status: 200, type: [MonthSummaryDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-aggregated-year-summary')
  async getAggregatedYearSummary(@Body() { year }: GetYearSummaryDto, @Req() req) {
    this.budgetService.setUserId(req.user.id)
    return await this.budgetService.getAggregatedYearSummary(year)
  }

  @ApiOperation({ summary: 'Итоговые данные за год', operationId: 'getPlainYearSummary' })
  @ApiResponse({ status: 200, type: [MonthSummaryDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-plain-year-summary')
  async getPlainYearSummary(@Body() { year }: GetYearSummaryDto, @Req() req) {
    this.budgetService.setUserId(req.user.id)
    return await this.budgetService.getPlainYearSummary(year)
  }

  @ApiOperation({ summary: 'Периоды регулярный операций', operationId: 'getPeriods' })
  @ApiResponse({ status: 200, type: [Period] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('get-periods')
  async getPeriods() {
    return await this.budgetService.getPeriods()
  }
}
