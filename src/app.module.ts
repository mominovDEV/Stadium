import { BOT_NAME } from './app.constants';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/models/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/models/comfort.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { MailService } from './mail/mail.service';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { Bot } from './bot/model/bot.model';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/model/otp.model';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Comfort, Bot, Otp],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    ComfortStadiumModule,
    BotModule,
    OtpModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
