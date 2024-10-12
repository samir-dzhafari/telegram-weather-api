import { LogEntity } from '@/data/database/entities';
import { LogResponse } from '@/domain/entities/logs';
import { GetAllLogsDto } from "@/domain/modules/logs";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { query } from "express";
import { Repository } from 'typeorm';

@Injectable()
export class GetAllLogsService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
  ) {}

  async execute(dto: GetAllLogsDto): Promise<LogResponse[]> {
    const queryBuilder = this.logsRepository.createQueryBuilder('log');

    if (dto.startDate) {
      queryBuilder.andWhere('log.datetime >= :startDate', { startDate: new Date(dto.startDate) });
    }

    if (dto.endDate) {
      queryBuilder.andWhere('log.datetime <= :endDate', { endDate: new Date(dto.endDate) });
    }

    const page = dto?.page ?? 0;
    const limit = dto?.limit ?? 100

    if (limit > 2000) {
      throw new HttpException('Limit exceeds maximum value of 2000', 404);
    }

    const entities = await queryBuilder
    .skip(page * limit)
    .take(limit)
    .getMany();

    return entities.map((entity) => LogResponse.fromEntity(entity));
  }
}
