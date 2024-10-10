import { LogEntity } from '@/data/database/entities';
import { TelegramService } from "@/domain/modules/telegram";
import { WeatherModule } from '@/domain/modules/weather';
import { TelegramController } from "@/interface/telegram";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
          launchOptions: {
            webhook: {
              domain: configService.get<string>('DOMAIN'),
              path: `/${configService.get<string>('TELEGRAM_WEBHOOK_PATH')}`,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    WeatherModule,
  ],
  providers: [TelegramController, TelegramService],
})
export class TelegramModule {}
