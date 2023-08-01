import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/models/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/models/comfort.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Comfort],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    ComfortStadiumModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
