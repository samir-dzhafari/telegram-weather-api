import { LogsModule } from '@/domain/modules/logs';
import {
  BaseTelegramService
} from "@/domain/modules/telegram/services/base-telegram.service";
import { TelegramCommandService } from '@/domain/modules/telegram/services/telegram-command.service';
import { TelegramGeneralService } from '@/domain/modules/telegram/services/telegram-general.service';
import { TelegramWeatherService } from '@/domain/modules/telegram/services/telegram-weather.service';
import { WeatherModule } from '@/domain/modules/weather';
import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as TelegramBot from 'node-telegram-bot-api';

@Module({
  imports: [LogsModule, WeatherModule],
  providers: [
    TelegramCommandService,
    BaseTelegramService,
    TelegramGeneralService,
    TelegramWeatherService,
    {
      provide: "TelegramBot",
      useFactory: (configService: ConfigService) => {
        const token = configService.get<string>('TELEGRAM_BOT_TOKEN');
        return new TelegramBot(token, { polling: true });
      },
      inject: [ConfigService],
    },
  ],
})
export class TelegramModule {}
