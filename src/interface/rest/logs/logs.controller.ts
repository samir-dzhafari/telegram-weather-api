import { LogResponse } from '@/domain/entities/logs';
import { GetAllForUserLogsDto } from '@/domain/modules/logs/dtos/get-all-for-user-logs.dto';
import { GetAllLogsDto } from '@/domain/modules/logs/dtos/get-all-logs.dto';
import { GetAllForUserLogsService } from '@/domain/modules/logs/services/get-all-for-user-logs.service';
import { GetAllLogsService } from '@/domain/modules/logs/services/get-all-logs.service';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Logs')
@Controller('logs')
export class LogsController {
  constructor(
    private readonly getAllLogsService: GetAllLogsService,
    private readonly getAllForUserLogsService: GetAllForUserLogsService,
  ) {}

  // Get All

  @Get()
  @ApiOperation({ summary: 'Get all logs' })
  @ApiQuery({ name: 'page', required: false, description: 'Page', type: 'int' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit',
    type: 'int',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date and time in YYYY-MM-DD HH:mm:ss format',
    type: 'string',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date and time in YYYY-MM-DD HH:mm:ss format',
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LogResponse,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getLogs(@Query() query: GetAllLogsDto) {
    return this.getAllLogsService.execute(query);
  }

  // Get All For User

  @Get(':userId')
  @ApiOperation({ summary: 'Get all logs for telegram user' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Telegram user id',
    type: 'long',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page', type: 'int' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit',
    type: 'int',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LogResponse,
    isArray: true,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date and time in YYYY-MM-DD HH:mm:ss format',
    type: 'string',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date and time in YYYY-MM-DD HH:mm:ss format',
    type: 'string',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getUserLogs(
    @Param('userId') userId: number,
    @Query() query: GetAllForUserLogsDto,
  ) {
    return this.getAllForUserLogsService.execute(userId, query);
  }
}
