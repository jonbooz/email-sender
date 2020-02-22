import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../sender/models/BoundModule";
import {ModuleEntry} from "../../../../sender/models/ModuleEntry";
import {StringFormatter} from "../../../../sender/engine/processes/formatter/StringFormatter";

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processes/formatter/StringFormatter', () => {
    it('formats a string', async () => {
        const formatter = new StringFormatter();

        const str = 'string';
        const entry = new ModuleEntry('heading', str, 'text');
        const module = new BoundModule(null, null, null, entry);
        const result = await formatter.send(module);

        expect(result.moduleEntry.entry).to.eql(str);
    });
});
