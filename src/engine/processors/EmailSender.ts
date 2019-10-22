import * as datetime from 'node-datetime';
import * as AwsUtils from "aws-utils";
import { Context } from '../../models/Context';
import { Processor } from "./Processor";

const EMAIL_SUBJECT = 'Daily Reminders';
const EMAIL_SOURCE = 'jon@jonbooz.com';
/**
 * This module sends a prepared email to the user's registered email address.
 */
export class EmailSender implements Processor<string, string> {
    private readonly _aws: AwsUtils;

    constructor(aws: AwsUtils) {
        this._aws = aws;
    }

    async process(messageBody: string, context: Context): Promise<string> {
        const recipients = [context.user.email];
        const subjectToSend = EMAIL_SUBJECT + ' - ' + datetime.create().format('m/d/Y');
        await this._aws.ses.sendEmail(subjectToSend, messageBody, EMAIL_SOURCE, recipients);
        return messageBody;
    }

}
