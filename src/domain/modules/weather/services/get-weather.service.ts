import { WeatherResponse } from '@/domain/entities/weather';
import { IWeatherGateway } from '@/domain/gateways/weather';
import { GetWeatherDto } from '@/domain/modules/weather';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetWeatherService {
  constructor(
    @Inject('IWeatherGateway') private readonly weatherGateway: IWeatherGateway,
  ) {}

  async execute(dto: GetWeatherDto): Promise<WeatherResponse> {
    const weather = await this.weatherGateway.get(dto.city);

    return WeatherResponse.fromDomain(weather);
  }
}
