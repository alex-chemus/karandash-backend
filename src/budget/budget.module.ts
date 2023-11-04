import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Period } from './models/period.model';
import { RegularBudget } from './models/regualar-budget.model';
import { SingularBudget } from './models/singular-budget.model';
import { BudgetController } from './budget.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BudgetService],
  imports: [SequelizeModule.forFeature([Period, RegularBudget, SingularBudget]), AuthModule],
  controllers: [BudgetController]
})
export class BudgetModule {}
