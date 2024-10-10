export class Log {
  constructor(
    readonly telegramUserId: number,
    readonly command: string,
    readonly datetime: Date,
    readonly answer: string,
  ) {}
}
