import { SlackBuilder } from "./builder/slack.builder";

export interface ISlackService {
    sendMarkdownMessage(builder: SlackBuilder): Promise<void>;
}
