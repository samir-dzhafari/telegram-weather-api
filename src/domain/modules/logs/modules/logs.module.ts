import { LogEntity } from '@/data/database/entities';
import {
  GetAllForUserLogsService,
  GetAllLogsService
} from "@/domain/modules/logs";
import { LogsController } from "@/interface/rest";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogsController],
  providers: [GetAllLogsService, GetAllForUserLogsService],
})
export class LogsModule {}
