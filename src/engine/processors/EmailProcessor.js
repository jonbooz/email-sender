'use strict';

const Context = require('../../models/Context.js');
const ModuleEntry = require('../../models/ModuleEntry.js');

const HTML_FIRST_LINE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml">';

const heading = function(level, text) {
    if (level < 1) {
        level = 1;
    } else if (level > 5) {
        level = 5;
    }

    return '<h' + level + '>' + text + '</h' + level +'>';
};

const paragraph = function(text) {
    return '<p>' + text + '</p>';
};

const body = function(content) {
    return '<body>' + content + '</body>';
};

const email = function(body) {
    return HTML_FIRST_LINE + '<html>' + body + '</html>';
};

/**
 * This processor takes a list of heading/entry pairs and 
 * generates the body of a email to send.
 */
module.exports = class EmailProcessor {

    /**
     * 
     * @param {[ModuleEntry]} entries 
     * @param {Context} context 
     */
    async process(entries, context) {
        let emailBody = '';
        for (let i in entries) {
            const entry = entries[i];
            emailBody += heading(2, entry.heading) + paragraph(entry.entry);
        }
        emailBody = body(emailBody);

        return email(emailBody);
    }

};