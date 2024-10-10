import { LogEntity } from '@/data/database/entities';
import { TelegramBaseDto } from '@/domain/entities/telegram';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>,
  ) {}

  async execute(dto: TelegramBaseDto): Promise<string> {
    const answer =
      'Hello! Enter the command "/weather <city>" to find out the weather.';

    await this.logsRepository.save({
      telegramUserId: dto.userId,
      command: dto.command,
      answer,
    });

    return answer;
  }
}
