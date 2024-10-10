import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Context } from 'telegraf';

export class TelegramBaseDto {
  @IsString()
  @MinLength(2)
  readonly command: string;

  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  constructor(ctx: Context) {
    this.command = ctx.text;
    this.userId = ctx.from.id;
  }

  get parts() {
    return this.command.split(' ');
  }
}
