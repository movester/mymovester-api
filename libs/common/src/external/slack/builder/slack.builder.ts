import { config } from '@app/common/config/config.service';
import { KnownBlock, MrkdwnElement, SectionBlock } from '@slack/web-api';

export abstract class SlackBuilder {
    private readonly channel: string;
    private message: KnownBlock[];

    protected constructor(
        channel = config.get('ENVIRONMENT') === 'local'
            ? config.get('SLACK_CHANNEL_DEFAULT')
            : config.get('SLACK_CHANNEL_TRAFFIC_CHECK')
    ) {
        this.channel = channel;
    }

    abstract buildBlock(): KnownBlock[];

    build(): SlackBuilder {
        this.message = this.buildBlock();
        return this;
    }

    getMessage(): KnownBlock[] {
        return this.message;
    }

    getChannel(): string {
        return this.channel;
    }

    protected makeHeaderSection(message: string): SectionBlock {
        return {
            type: 'section',
            text: this.makeMarkdownElement(message),
        };
    }

    protected makeBodySection(elements: MrkdwnElement[]): SectionBlock {
        return {
            type: 'section',
            fields: elements,
        };
    }

    protected makeBodyContext(elements: MrkdwnElement[]): KnownBlock {
        return {
            type: 'context',
            elements,
        };
    }

    protected makeBodyMarkdown(text: string): KnownBlock {
        return {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: text,
            },
        } as KnownBlock;
    }

    protected makeMarkdownElement(text: string): MrkdwnElement {
        return { type: 'mrkdwn', text };
    }

    protected makeDivider(): KnownBlock {
        return { type: 'divider' };
    }
}
