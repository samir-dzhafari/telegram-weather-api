import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, Min } from "class-validator";

export class GetAllLogsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  constructor() {
    this.page = 0;
    this.limit = 100;
  }
}