import { LogEntity } from '@/data/database/entities';
import { OpenWeatherMapGateway } from '@/data/gateways/openWeatherMap';
import { GetWeatherService } from '@/domain/modules/weather';
import { WeatherController } from '@/interface/telegram';
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
    WeatherController,
    GetWeatherService,
    {
      provide: 'IWeatherGateway',
      useClass: OpenWeatherMapGateway,
    },
  ],
})
export class WeatherModule {}
