import { LogEntity } from '@/data/database/entities';
import { LogResponse } from '@/domain/entities/logs';
import { CreateLogDto } from "@/domain/modules/logs";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateLogService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
  ) {}

  async execute(dto: CreateLogDto): Promise<LogResponse> {

    const log = await this.logsRepository.save({
      telegramUserId: dto.telegramUserId,
      command: dto.command,
      answer: dto.answer,
    })

    return LogResponse.fromEntity(log)
  }
}
