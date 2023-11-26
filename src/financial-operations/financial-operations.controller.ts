import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FinancialOperationsService } from './financial-operations.service';
import { AddSingularFinancialOperationDto } from './dto/add-singular-financial-operation.dto';
import { AddRegularFinancialOperationDto } from './dto/add-regular-financial-operation.dto';
import { GetYearSummaryDto } from './dto/get-year-summary.dto';
import { SingularFinancialOperation } from './models/singular-financial-operation.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegularFinancialOperation } from './models/regualar-financial-operation.model';
import { MonthSummaryDto } from './dto/month-summary.dto';
import { Period } from './models/period.model';

@ApiTags('Financial operations')
@Controller('financial-operations')
export class FinancialOperationsController {
  constructor(private readonly financialOperationsService: FinancialOperationsService) {}

  @ApiOperation({ summary: 'Добавить разовый доход/расход', operationId: 'addSingularFinancialOperation' })
  @ApiResponse({ status: 200, type: SingularFinancialOperation })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('add-singular-financial-operation')
  async addSingularFinancialOperationItem(@Body() financialOperationItem: AddSingularFinancialOperationDto, @Req() req) {
    this.financialOperationsService.setUserId(req.user.id)
    return await this.financialOperationsService.addSingularFinancialOperation(financialOperationItem)
  }

  @ApiOperation({ summary: 'Добавить регулярный доход/расход', operationId: 'addRegularFinancialOperation' })
  @ApiResponse({ status: 200, type: RegularFinancialOperation })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('add-regular-financial-operation')
  async addRegularFinancialOperationItem(@Body() financialOperationItem: AddRegularFinancialOperationDto, @Req() req) {
    this.financialOperationsService.setUserId(req.user.id)
    return await this.financialOperationsService.addRegularFinancialOperation(financialOperationItem)
  }

  /* todo: сделать удаление айтемов регулярного бюджета по айди */

  @ApiOperation({ summary: 'Итоговые данные за год с накоплением', operationId: 'getAggregatedYearSummary' })
  @ApiResponse({ status: 200, type: [MonthSummaryDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-aggregated-year-summary')
  async getAggregatedYearSummary(@Body() { year }: GetYearSummaryDto, @Req() req) {
    this.financialOperationsService.setUserId(req.user.id)
    return await this.financialOperationsService.getAggregatedYearSummary(year)
  }

  @ApiOperation({ summary: 'Итоговые данные за год', operationId: 'getPlainYearSummary' })
  @ApiResponse({ status: 200, type: [MonthSummaryDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-plain-year-summary')
  async getPlainYearSummary(@Body() { year }: GetYearSummaryDto, @Req() req) {
    this.financialOperationsService.setUserId(req.user.id)
    return await this.financialOperationsService.getPlainYearSummary(year)
  }

  @ApiOperation({ summary: 'Периоды регулярный операций', operationId: 'getPeriods' })
  @ApiResponse({ status: 200, type: [Period] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('get-periods')
  async getPeriods() {
    return await this.financialOperationsService.getPeriods()
  }
}
