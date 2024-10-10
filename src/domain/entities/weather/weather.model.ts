export class Weather {
  constructor(
    readonly temperature: number,
    readonly feelsLike: number,
    readonly descriptions: string,
    readonly humidity: number,
    readonly windSpeed: number,
  ) {}
}