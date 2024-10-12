import { LogEntity } from "@/data/database/entities";
import { LogResponse } from "@/domain/entities/logs";
import { GetAllForUserLogsDto } from "@/domain/modules/logs";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GetAllForUserLogsService {
  constructor(
    @InjectRepository(LogEntity)
    private logsRepository: Repository<LogEntity>
  ) {
  }

  async execute(
    userId: number,
    dto: GetAllForUserLogsDto
  ): Promise<LogResponse[]> {
    const queryBuilder = this.logsRepository.createQueryBuilder("log");

    queryBuilder.where("log.telegramUserId = :userId", { userId } );

    if (dto.startDate) {
      queryBuilder.andWhere(
        "log.datetime >= :startDate",
        { startDate: new Date(dto.startDate) }
      );
    }

    if (dto.endDate) {
      queryBuilder.andWhere(
        "log.datetime <= :endDate",
        { endDate: new Date(dto.endDate) }
      );
    }

    const page = dto?.page ?? 0;
    const limit = dto?.limit ?? 100;

    if (limit > 2000) {
      throw new HttpException("Limit exceeds maximum value of 2000", 404);
    }

    const entities = await queryBuilder.skip(page * limit).
      take(limit).
      getMany();

    return entities.map((entity) => LogResponse.fromEntity(entity));
  }
}
