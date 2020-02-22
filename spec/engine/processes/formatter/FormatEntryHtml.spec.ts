import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../sender/models/BoundModule";
import {ModuleEntry} from "../../../../sender/models/ModuleEntry";
import {FormatEntryHtml} from "../../../../sender/engine/processes/formatter/FormatEntryHtml";

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processes/formatter/FormatEntryHtml', () => {
    it('formats an entry into HTML', async () => {
        const expected = '<h2>heading</h2><p>email</p>';
        const formatter = new FormatEntryHtml();

        const entry = new ModuleEntry('heading', 'email', 'text');
        const module = new BoundModule(null, null, null, entry, 'email');
        const result = await formatter.send(module);

        expect(result.email).to.eql(expected);
    });
});
