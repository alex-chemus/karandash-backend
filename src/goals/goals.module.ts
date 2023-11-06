import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goal } from './goals.model';
import { AuthModule } from 'src/auth/auth.module';
import { GoalsController } from './goals.controller';

@Module({
  providers: [GoalsService],
  imports: [SequelizeModule.forFeature([Goal]), AuthModule],
  controllers: [GoalsController]
})
export class GoalsModule {}
