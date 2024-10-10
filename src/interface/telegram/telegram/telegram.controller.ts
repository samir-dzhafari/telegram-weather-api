import { TelegramService } from "@/domain/modules/telegram";
import { GetWeatherDto } from "@/domain/modules/weather";
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    const dto = new GetWeatherDto(ctx);

    const answer = await this.telegramService.execute(dto);

    await ctx.reply(answer);
  }
}
