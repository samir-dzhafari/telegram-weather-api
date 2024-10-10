import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from '@/domain/modules/app/modules/app.module';
import { getBotToken } from "nestjs-telegraf";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Telegram weather api')
  .setDescription('For BobrAI')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(`/${configService.get<string>('TELEGRAM_WEBHOOK_PATH')}`));

  await app.listen(3000);
}
bootstrap();
