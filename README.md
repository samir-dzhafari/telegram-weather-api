# Weather Telegram Bot

## Description
This is a Telegram bot designed to provide the current weather in a specified city.

## Installation

1. **Install Dependencies**  
   Use pnpm to install the required dependencies:
   ```bash
   pnpm install
   ```

2. **Environment Variables**  
   Rename `.env.example` to `.env` and fill in the necessary information:
    - For Telegram: `TELEGRAM_TOKEN`

3. **Run Database with Docker**  
   Make sure Docker is installed on your system. Follow the instructions [here](https://docs.docker.com/engine/install/) to install Docker if you haven't already.

   Then, run the database using Docker:
   ```bash
   pnpm docker:run
   ```

4. **Start the Application**  
   Finally, start the application:
   ```bash
   pnpm start
   ```

# API Documentation (Swagger)
You can access the API documentation at:
[http://localhost:3000/api/](http://localhost:3000/api/)

# Weather Telegram Bot Documentation

## Overview
This Telegram bot provides current weather information for specified cities. Users can request weather details using the `/weather` command followed by the city name.

## Commands

### /weather \<city>
This command retrieves the current weather information for the specified city.

#### Parameters
- **city**: The name of the city for which you want to get the weather information.

#### Response Format
When the command is successfully executed, the bot will respond with the following message format:
```text
    Temperature: <value>°C
    Feels like: <value>°C 
    Humidity: <value>% 
    Wind speed: <value> m/s Description: ${weather.descriptions}
```

# Caching
To improve the performance of the bot and reduce the number of requests to the weather API, caching has been implemented. The bot caches the weather data for each city for a specified duration. This allows for quicker responses when users request the same city's weather information within the cache validity period.

### Benefits of Caching
- **Reduced Latency**: Users receive weather updates faster since the bot retrieves data from the cache rather than making a new API request.
- **API Rate Limiting**: Caching helps in staying within the limits set by the weather API provider, preventing potential service interruptions due to excessive requests.
- **Improved User Experience**: By providing faster responses, users can enjoy a smoother interaction with the bot.

### Cache Expiry
Cached weather data is set to expire after a defined period (e.g., 10 minutes). After the expiry, the bot will fetch fresh data from the weather API the next time the same city is requested.
