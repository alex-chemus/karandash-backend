import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesModule } from './notes/notes.module';
import { User } from './users/users.model';
import { Note } from './notes/notes.model';
import { FinancialOperationsModule } from './financial-operations/financial-operations.module';
import { Period } from './financial-operations/models/period.model';
import { RegularFinancialOperation } from './financial-operations/models/regualar-financial-operation.model';
import { SingularFinancialOperation } from './financial-operations/models/singular-financial-operation.model';
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
      models: [User, Note, Period, RegularFinancialOperation, SingularFinancialOperation, Goal],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
    NotesModule,
    FinancialOperationsModule,
    GoalsModule,
  ],
})
export class AppModule {}
