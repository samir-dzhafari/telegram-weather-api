import { LogEntity } from '@/data/database/entities';
import { LogResponse } from '@/domain/entities/logs';
import { GetAllLogsDto } from "@/domain/modules/logs";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllLogsService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
  ) {}

  async execute(dto: GetAllLogsDto): Promise<LogResponse[]> {
    const queryBuilder = this.logsRepository.createQueryBuilder('log');

    // Фильтрация по времени
    if (dto.startDate) {
      queryBuilder.andWhere('log.datetime >= :startDate', { startDate: new Date(dto.startDate) });
    }

    if (dto.endDate) {
      queryBuilder.andWhere('log.datetime <= :endDate', { endDate: new Date(dto.endDate) });
    }

    const entities = await queryBuilder
    .skip(dto.page * dto.limit)
    .take(dto.limit)
    .getMany();

    return entities.map((entity) => LogResponse.fromEntity(entity));
  }
}
