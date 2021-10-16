import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../src/models/BoundModule";
import {Module} from "../../../../src/models/Module";
import {FormatEntryHtml} from "../../../../src/engine/processes/formatter/FormatEntryHtml";

describe('engine/processes/formatter/FormatEntryHtml', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('formats an entry into HTML', async () => {
        const expected = '<h2>heading</h2><p>email</p>';
        const formatter = new FormatEntryHtml();

        const module = new Module({id:'id', heading:'heading', entries:[]});
        const boundModule = new BoundModule(null, module, null, null, 'email');
        const result = await formatter.send(boundModule);

        expect(result.email).to.eql(expected);
    });
});
