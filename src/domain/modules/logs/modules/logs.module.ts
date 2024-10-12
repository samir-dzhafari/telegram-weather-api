import { LogEntity } from '@/data/database/entities';
import {
  CreateLogService
} from "@/domain/modules/logs/services/create-log.service";
import {
  GetAllForUserLogsService
} from "@/domain/modules/logs/services/get-all-for-user-logs.service";
import {
  GetAllLogsService
} from "@/domain/modules/logs/services/get-all-logs.service";
import { LogsController } from 'interface/routes';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogsController],
  providers: [GetAllLogsService, GetAllForUserLogsService, CreateLogService],
  exports: [CreateLogService]
})
export class LogsModule {}
