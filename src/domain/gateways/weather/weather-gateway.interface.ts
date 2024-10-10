import { Weather } from '@/domain/entities/weather';

export interface IWeatherGateway {
  get(city: string): Promise<Weather>;
}
