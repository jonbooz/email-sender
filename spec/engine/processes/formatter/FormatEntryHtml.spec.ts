import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../src/models/BoundModule";
import {ModuleEntry} from "../../../../src/models/ModuleEntry";
import {FormatEntryHtml} from "../../../../src/engine/processes/formatter/FormatEntryHtml";

describe('engine/processes/formatter/FormatEntryHtml', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('formats an entry into HTML', async () => {
        const expected = '<h2>heading</h2><p>email</p>';
        const formatter = new FormatEntryHtml();

        const entry = new ModuleEntry('heading', 'email', 'text');
        const module = new BoundModule(null, null, null, entry, 'email');
        const result = await formatter.send(module);

        expect(result.email).to.eql(expected);
    });
});
