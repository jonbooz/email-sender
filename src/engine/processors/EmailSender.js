'use strict';

const AwsUtils = require('aws-utils');
const Context = require('../../models/Context.js');

const EMAIL_SUBJECT = 'Daily Reminders';
const EMAIL_SOURCE = 'jon@jonbooz.com';

/**
 * This module sends a prepared email to the user's registered email address.
 */
module.exports = class EmailSender {
    /**
     * 
     * @param {AwsUtils} aws 
     */
    constructor(aws) {
        this._aws = aws;
    }

    /**
     * 
     * @param {string} messageBody 
     * @param {Context} context 
     */
    async process(messageBody, context) {
        const recipients = [context.getUser().email];
        this._aws.ses.sendEmail(EMAIL_SUBJECT, messageBody, EMAIL_SOURCE, recipients);
        return messageBody;
    }
};