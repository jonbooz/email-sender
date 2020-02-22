import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../sender/models/BoundModule";
import {Module} from "../../../../sender/models/Module";
import {Record} from "../../../../sender/models/Record";
import {FormatEmailHtml} from "../../../../sender/engine/processes/formatter/FormatEmailHtml";

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processes/formatter/FormatEntryHtml', () => {
    it('formats a record into HTML', async () => {
        const expected = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml">' +
            '<html><body><h2>heading</h2><p>email</p></body></html>';
        const formatter = new FormatEmailHtml();

        const module = new Module({id: 'mod'});
        const boundModule = new BoundModule(null, module, null, null, '<h2>heading</h2><p>email</p>');
        const record = new Record('test', null, [boundModule]);
        const result = await formatter.send(record);

        expect(result.email).to.eql(expected);
    });
});