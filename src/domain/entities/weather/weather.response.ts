import { Weather as WeatherEntity } from '@/domain/entities/weather';
import { ApiProperty } from '@nestjs/swagger';

export class Weather {
  @ApiProperty({ description: 'Telegram User ID', example: '123456' })
  telegramUserId: number;

  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;

  static fromDomain(weather: WeatherEntity): Weather {
    const response = new Weather();

    response.temperature = weather.temperature;
    response.feelsLike = weather.feelsLike;
    response.humidity = weather.humidity;
    response.windSpeed = weather.windSpeed;

    return response;
  }
}
