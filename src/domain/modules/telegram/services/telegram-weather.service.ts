import { CreateLogService } from '@/domain/modules/logs/services/create-log.service';
import { BaseTelegramService } from '@/domain/modules/telegram/services/base-telegram.service';
import { TelegramLog } from '@/domain/modules/telegram/shared/decorators/telegram-log-request.decorator';
import { GetWeatherDto } from '@/domain/modules/weather';
import { GetWeatherService } from '@/domain/modules/weather/services/get-weather.service';
import { Injectable, Logger } from "@nestjs/common";
import TelegramBot, { Message } from 'node-telegram-bot-api';

@Injectable()
export class TelegramWeatherService extends BaseTelegramService {
  constructor(
    protected readonly bot: TelegramBot,
    protected readonly createLogService: CreateLogService,
    private readonly getWeatherService: GetWeatherService,
  ) {
    super(bot, createLogService);
  }

  @TelegramLog("/weather")
  async execute(msg: Message, match: RegExpExecArray) {
    const city = match ? match[1] : 'unknown';

    let answer: string

    try {
      let weather = await this.getWeatherService.execute(new GetWeatherDto(city));
      answer = weather.getAnswer();
    } catch (error) {
      if (error.response.status == 404) {
        answer = `The name of the city was entered incorrectly. Example: /weather Rostov-on-Don`;
      } else {
        answer = `Unknown error`;
      }
    }

    await this.sendMessage(msg.chat.id, answer);

    return answer;
  }
}
