import * as sinon from 'sinon';
import {expect} from 'chai';

import {ModuleEntry} from "../../sender/models/ModuleEntry";

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('models/ModuleEntry', () => {
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