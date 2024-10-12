import {
  BaseTelegramService
} from "@/domain/modules/telegram/services/base-telegram.service";
import { TelegramCommandService } from '@/domain/modules/telegram/services/telegram-command.service';
import { TelegramLog } from '@/domain/modules/telegram/shared/decorators/telegram-log-request.decorator';
import { Injectable } from '@nestjs/common';
import TelegramBot, { Message } from "node-telegram-bot-api";

@Injectable()
export class TelegramGeneralService extends BaseTelegramService {

  @TelegramLog("/start")
  async execute(msg: Message): Promise<string> {
    const answer = 'Hello! Enter the command "/weather <city>" to find out the weather. The bot was created as a test for BobrAI';

    await this.sendMessage(msg.chat.id, answer);

    return answer
  }
}
