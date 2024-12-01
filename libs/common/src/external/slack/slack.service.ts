import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { ISlackService } from './slack.interface';
import { config } from '@app/common/config/config.service';
import { SlackBuilder } from './builder/slack.builder';

@Injectable()
export class SlackService implements ISlackService {
  private readonly slackClient: WebClient;

  constructor() {
    this.slackClient = new WebClient(config.get('SLACK_API_TOKEN'));
  }

  // * API Token 방식 - markdown
  async sendMarkdownMessage(builder: SlackBuilder): Promise<void> {
    await this.slackClient.chat.postMessage({
      channel: builder.getChannel(),
      blocks: builder.getMessage(),
      text: `''`,
    });
  }
}
