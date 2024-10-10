import { WeatherResponse } from '@/data/gateways/models/response';
import { weatherMapper } from '@/domain/entities/weather';
import { Weather } from '@/domain/entities/weather/weather.model';
import { IWeatherGateway } from '@/domain/gateways/weather';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, CacheStore } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OpenWeatherMapGateway implements IWeatherGateway {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
  }

  async get(city: string): Promise<Weather> {
    const cacheKey = `weather_${city.toLowerCase()}`;

    const cachedWeather: WeatherResponse = await this.cacheManager.get(cacheKey);
    if (cachedWeather) {
      return weatherMapper(cachedWeather);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=en`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      const data: WeatherResponse = response.data;

      await this.cacheManager.set(cacheKey, data, { ttl: 600 });

      return weatherMapper(data);
    } catch (error) {
      throw error
    }
  }
}
