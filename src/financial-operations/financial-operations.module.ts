import { Module } from '@nestjs/common';
import { FinancialOperationsService } from './financial-operations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Period } from './models/period.model';
import { RegularFinancialOperation } from './models/regualar-financial-operation.model';
import { SingularFinancialOperation } from './models/singular-financial-operation.model';
import { FinancialOperationsController } from './financial-operations.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FinancialOperationsService],
  imports: [SequelizeModule.forFeature([Period, RegularFinancialOperation, SingularFinancialOperation]), AuthModule],
  controllers: [FinancialOperationsController]
})
export class FinancialOperationsModule {}
