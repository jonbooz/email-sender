import {Process} from "./Process";
import {Record} from "../../models/Record";
import AwsUtils = require("aws-utils");
import datetime = require("node-datetime");


const EMAIL_SUBJECT = 'Daily Reminders';
const EMAIL_SOURCE = 'jon@jonbooz.com';

export class SendEmail extends Process<Record, Record> {

    constructor(private readonly _aws: AwsUtils) {
        super();
    }

    protected receive(msg: Record): Promise<Record> {
        const recipients = [msg.user.email];
        const subjectToSend = EMAIL_SUBJECT + ' - ' + datetime.create().format('m/d/Y');
        return this._aws.ses.sendEmail(subjectToSend, msg.email, EMAIL_SOURCE, recipients)
            .then(() => msg);
    }

}