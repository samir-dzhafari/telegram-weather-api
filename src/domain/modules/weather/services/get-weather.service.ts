import { LogEntity } from '@/data/database/entities';
import { IWeatherGateway } from '@/domain/gateways/weather';
import { GetWeatherDto } from "@/domain/modules/weather";
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetWeatherService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
    @Inject('IWeatherGateway') private readonly weatherGateway: IWeatherGateway,
  ) {}

  async execute(dto: GetWeatherDto): Promise<string> {
    let answer: string;

    try {
      const weather = await this.weatherGateway.get(dto.city);

      answer = `Temperature: ${weather.temperature}°C\nFeels like: ${weather.feelsLike}°C\nHumidity: ${weather.humidity}%\nWind speed: ${weather.windSpeed} m/s\nDescription: ${weather.descriptions}`;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        answer = `The name of the city was entered incorrectly. Example: /weather Rostov-on-Don`;
      }
      answer = `Unknown error`;
    }

    await this.logsRepository.save({
      telegramUserId: dto.userId,
      command: dto.command,
      answer,
    });

    return answer;
  }
}
