import { LogEntity } from "@/data/database/entities";
import { LogsModule } from '@/domain/modules/logs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER', 'root'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'root'),
        database: configService.get<string>('POSTGRES_DB', 'root'),
        entities: [LogEntity],
        synchronize: true,
      }),
    }),
    LogsModule,
    WeatherModule
  ],
})
export class AppModule {}
