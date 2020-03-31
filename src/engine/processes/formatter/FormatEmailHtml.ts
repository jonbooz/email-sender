import {Process} from "../Process";
import {Record} from "../../../models/Record";

const HTML_FIRST_LINE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml">';

export class FormatEmailHtml extends Process<Record, Record> {

    protected async receive(msg: Record): Promise<Record> {
        const emailContents = msg.modules.map(m => m.email).join('');
        const emailBody = FormatEmailHtml.body(emailContents);
        msg.email = FormatEmailHtml.email(emailBody);
        return msg;
    }

    private static body(content: string): string {
        return '<body>' + content + '</body>';
    }

    private static email(body: string): string {
        return HTML_FIRST_LINE + '<html>' + body + '</html>';
    }

}