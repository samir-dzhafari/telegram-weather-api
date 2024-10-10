import { LogEntity } from '@/data/database/entities';
import { ApiProperty } from '@nestjs/swagger';

export class Log {
  @ApiProperty({ description: 'Telegram User ID', example: '123456' })
  telegramUserId: number;

  @ApiProperty({ description: 'Executed command', example: '/weather Kazan' })
  command: string;

  @ApiProperty({
    description: 'Date and time of the command execution',
    example: '2024-10-10T12:34:56Z',
  })
  datetime: string;

  @ApiProperty({
    description: "Bot's answer to the command",
    example: 'The weather is sunny with 25°C',
  })
  answer: string;

  static fromEntity(log: LogEntity): Log {
    const response = new Log();

    response.telegramUserId = log.telegramUserId;
    response.command = log.command;
    response.datetime = log.datetime.toString();
    response.answer = log.answer;

    return response;
  }
}
