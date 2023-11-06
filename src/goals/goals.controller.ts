import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { AddGoalDto } from './dto/add-goal.dto';
import { Goal } from './goals.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { YearDto } from './dto/year.dto';

@ApiTags('Goals')
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiOperation({ summary: 'Добавить цель', operationId: 'addGoal' })
  @ApiResponse({ status: 200, type: Goal })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('add-goal')
  async addGoal(@Body() dto: AddGoalDto, @Req() req) {
    this.goalsService.setUserId(req.user.id)
    return await this.goalsService.addGoal(dto)
  }

  @ApiOperation({ summary: 'Показать цели', operationId: 'getGoals' })
  @ApiResponse({ status: 200, type: [Goal] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-goals')
  async getGoals(@Body() { year }: YearDto, @Req() req) {
    this.goalsService.setUserId(req.user.id)
    return await this.goalsService.getGoals(year)
  }
}
