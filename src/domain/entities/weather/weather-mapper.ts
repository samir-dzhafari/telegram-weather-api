import { WeatherResponse } from "@/data/gateways/models/response";
import { Weather } from "@/domain/entities/weather/weather.model";

export const weatherMapper = (weather: WeatherResponse): Weather => ({
  temperature: Number(weather.main.temp.toFixed(1)),
  feelsLike: Number(weather.main.feels_like.toFixed(1)),
  descriptions: weather.weather.map(w => w.description).join(', '),
  humidity: weather.main.humidity,
  windSpeed: weather.wind.speed
})
