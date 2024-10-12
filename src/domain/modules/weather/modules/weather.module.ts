import { LogEntity } from '@/data/database/entities';
import { OpenWeatherMapGateway } from '@/data/gateways/openWeatherMap';
import {
  GetWeatherService
} from "@/domain/modules/weather/services/get-weather.service";
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
    HttpModule,
    CacheModule.register({
      ttl: 600,
      max: 100,
    }),
  ],
  controllers: [],
  providers: [
    GetWeatherService,
    {
      provide: 'IWeatherGateway',
      useClass: OpenWeatherMapGateway,
    },
  ],
  exports: [GetWeatherService]
})
export class WeatherModule {}
