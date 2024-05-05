import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import { IncomingWebhook } from '@slack/client';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        webhook.send({
          attachments: [
            {
              pretext: '🚨 API 에러 발생 🚨',
              fields: [
                {
                  title: `에러 메세지 : ${error.message}`,
                  value: error.stack,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(), // unix form
            },
          ],
        });
        throw error;
      }),
    );
  }
}
