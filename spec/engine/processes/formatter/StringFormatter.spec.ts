import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../../src/models/BoundModule";
import {ModuleEntry} from "../../../../src/models/ModuleEntry";
import {StringFormatter} from "../../../../src/engine/processes/formatter/StringFormatter";

describe('engine/processes/formatter/StringFormatter', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('formats a string', async () => {
        const formatter = new StringFormatter();

        const str = 'string';
        const entry = new ModuleEntry('heading', str, 'text');
        const module = new BoundModule(null, null, null, entry);
        const result = await formatter.send(module);

        expect(result.moduleEntry.entry).to.eql(str);
    });
});
