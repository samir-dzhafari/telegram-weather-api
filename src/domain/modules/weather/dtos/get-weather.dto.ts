import { TelegramBaseDto } from "@/domain/entities/telegram";

export class GetWeatherDto extends TelegramBaseDto {

  get city() {
    return this.parts.slice(1).join(" ")
  }

}