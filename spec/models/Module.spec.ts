import * as sinon from 'sinon';
import {expect} from 'chai';

import {Module} from "../../src/models/Module";

const MODULES = require('../../../../test-data/modules.json');

describe('models/Module', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('gets constructed (default format)', () => {
        const expected = MODULES['jonbooz/dokkodo'];
        const mod = new Module(expected);
        expect(mod.id).to.eql(expected.id);
        expect(mod.heading).to.eql(expected.heading);
        expect(mod.entries).to.eql(expected.entries);
        expect(mod.format).to.eql('text');
        expect(mod.type).to.eql('entries');
    });

    it('gets constructed (specified format)', () => {
        const expected = MODULES['jonbooz/header'];
        const mod = new Module(expected);
        expect(mod.id).to.eql(expected.id);
        expect(mod.heading).to.eql(expected.heading);
        expect(mod.entries).to.eql(expected.entries);
        expect(mod.format).to.eql(expected.format);
        expect(mod.type).to.eql('entries');
    });
});