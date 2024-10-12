import { CreateLogService } from '@/domain/modules/logs/services/create-log.service';
import { Inject, Injectable } from "@nestjs/common";
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BaseTelegramService {
  constructor(
    @Inject("TelegramBot") protected readonly bot: TelegramBot,
    protected readonly createLogService: CreateLogService,
  ) {}

  protected async sendMessage(chatId: number, text: string) {
    await this.bot.sendMessage(chatId, text);
  }
}
