
/*
 Important: Use with the createLogService
 */
import { Message } from "node-telegram-bot-api";

export function TelegramLog(tag: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: [Message, RegExpExecArray | null]) {
      const [msg, match] = args;

      const result = await originalMethod.apply(this, args);

      /*
       Get service from context
       */
      const logService = this.createLogService;

      await logService.execute({
        telegramUserId: msg?.chat.id ?? 0,
        command: `${tag} ${match[1]}`,
        answer: Boolean(result?.getAnswer) ? result.getAnswer() : result,
      });

      return result;
    };

    return descriptor;
  };
}
