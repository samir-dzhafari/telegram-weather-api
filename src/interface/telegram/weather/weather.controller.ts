import { GetWeatherDto, GetWeatherService } from "@/domain/modules/weather";
import { Command, Ctx, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class WeatherController {
  constructor(private readonly getWeatherService: GetWeatherService) {}

  @Command('weather')
  async getWeather(@Ctx() ctx: Context): Promise<void> {
    const dto = new GetWeatherDto(ctx);

    const answer = await this.getWeatherService.execute(dto);

    await ctx.reply(answer);
  }
}
