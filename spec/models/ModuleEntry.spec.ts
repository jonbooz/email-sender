import * as sinon from 'sinon';
import {expect} from 'chai';

import {ModuleEntry} from "../../src/models/ModuleEntry";

describe('models/ModuleEntry', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('gets constructed', () => {
        const heading = 'heading';
        const entry = 'entry';
        const format = 'format';

        const moduleEntry = new ModuleEntry(heading, entry, format);

        expect(moduleEntry.heading).to.eql(heading);
        expect(moduleEntry.entry).to.eql(entry);
        expect(moduleEntry.format).to.eql(format);
    });
});