import { TelegramGeneralService } from '@/domain/modules/telegram/services/telegram-general.service';
import { TelegramWeatherService } from '@/domain/modules/telegram/services/telegram-weather.service';
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramCommandService implements OnModuleInit {
  constructor(
    @Inject("TelegramBot") private readonly bot: TelegramBot,
    private readonly telegramGeneralService: TelegramGeneralService,
    private readonly telegramWeatherService: TelegramWeatherService,
  ) {}

  onModuleInit() {
    this.setupCommands();
  }

  private setupCommands(): void {
    this.configureStart();
    this.configureWeather();
  }

  // Commands

  private configureStart() {
    this.bot.onText(/\/start/, (msg) =>
      this.telegramGeneralService.execute(msg),
    );
  }

  private configureWeather() {
    this.bot.onText(/\/weather (.+)/, (msg, match) =>
      this.telegramWeatherService.execute(msg, match),
    );
  }
}
