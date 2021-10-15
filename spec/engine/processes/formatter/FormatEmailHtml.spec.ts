import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../src/models/BoundModule";
import {Module} from "../../../../src/models/Module";
import {Record} from "../../../../src/models/Record";
import {FormatEmailHtml} from "../../../../src/engine/processes/formatter/FormatEmailHtml";

describe('engine/processes/formatter/FormatEntryHtml', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

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