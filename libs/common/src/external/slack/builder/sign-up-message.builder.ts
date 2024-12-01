import { SlackBuilder } from './slack.builder';
import { config } from '@app/common/config/config.service';

export interface ISignUpMessageBuilderParam {
    userId: number;
    nickName: string;
    accessTime: string;
}

export class SignUpMessageBuilder extends SlackBuilder {
    constructor(
        private param: ISignUpMessageBuilderParam) {
        super(
            config.get('ENVIRONMENT') === 'local'
                ? config.get('SLACK_CHANNEL_DEFAULT')
                : config.get('SLACK_CHANNEL_TRAFFIC_CHECK')
        );
    }

    buildBlock() {
        const sectionFields = [
            `:wave: *닉네임(userId):* ${this.param.nickName}(${this.param.userId})`,
            `:dart: *접속 시간:* ${this.param.accessTime}`,
        ].join('\n\n');

        return [
            this.makeHeaderSection(`:movester: *뭅스터 회원가입 알림*`),
            this.makeDivider(),
            this.makeBodySection([this.makeMarkdownElement(sectionFields)]),
        ];
    }
}
