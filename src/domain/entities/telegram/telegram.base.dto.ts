export class Telegram {

  readonly parts: string[]

  constructor(message: string) {
    this.parts = message.split(" ")
  }
}