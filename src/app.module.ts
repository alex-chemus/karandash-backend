import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesModule } from './notes/notes.module';
import { User } from './users/users.model';
import { Note } from './notes/notes.model';
import { BudgetModule } from './budget/budget.module';
import { Period } from './budget/models/period.model';
import { RegularBudget } from './budget/models/regualar-budget.model';
import { SingularBudget } from './budget/models/singular-budget.model';
import { GoalsModule } from './goals/goals.module';
import { Goal } from './goals/goals.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Note, Period, RegularBudget, SingularBudget, Goal],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
    NotesModule,
    BudgetModule,
    GoalsModule,
  ],
})
export class AppModule {}
