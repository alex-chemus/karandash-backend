import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesModule } from './notes/notes.module';
import { User } from './users/users.model';
import { Note } from './notes/notes.model';
import { BudgetModule } from './budget/budget.module';

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
      models: [User, Note],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
    NotesModule,
    BudgetModule,
  ],
})
export class AppModule {}
