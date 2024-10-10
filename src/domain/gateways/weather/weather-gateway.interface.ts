import { Weather } from '@/domain/entities/weather/weather.model';

export interface IWeatherGateway {
  get(city: string): Promise<Weather>;
}
