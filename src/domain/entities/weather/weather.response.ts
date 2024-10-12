import { Weather as WeatherEntity } from '@/domain/entities/weather';
import { ITelegramMessageResponse } from "@/domain/interface";

export class Weather implements ITelegramMessageResponse {
  temperature: number;
  feelsLike: number;
  humidity: number;
  descriptions: string;
  windSpeed: number;

  static fromDomain(weather: WeatherEntity): Weather {
    const response = new Weather();

    response.temperature = weather.temperature;
    response.feelsLike = weather.feelsLike;
    response.humidity = weather.humidity;
    response.descriptions = weather.descriptions.join(', ');
    response.windSpeed = weather.windSpeed;

    return response;
  }

  getAnswer() {
    return `Temperature: ${this.temperature}°C\nFeels like: ${this.feelsLike}°C\nHumidity: ${this.humidity}%\nWind speed: ${this.windSpeed} m/s\nDescription: ${this.descriptions}`;
  }
}
