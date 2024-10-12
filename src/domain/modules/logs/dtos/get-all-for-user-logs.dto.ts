import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from "class-validator";

export class GetAllForUserLogsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Log page',
    required: false,
    type: 'int',
    nullable: false,
  })
  page?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Log limit',
    required: false,
    type: 'int',
    nullable: false,
  })
  limit?: number = 100;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Start date',
    required: false,
    type: 'int',
    nullable: false,
  })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'End date',
    required: false,
    type: 'int',
    nullable: false,
  })
  endDate?: string;
}
