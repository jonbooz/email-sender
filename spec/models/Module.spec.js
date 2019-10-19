const sinon = require('sinon');
const expect = require('chai').expect;

const Module = require('../../src/models/Module.js');

const MODULES = require('../../test-data/modules.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('models/Module', () => {
    it('gets constructed (default format)', () => {
        const expected = MODULES['jonbooz/dokkodo'];
        const mod = new Module(expected);
        expect(mod.id).to.eql(expected.id);
        expect(mod.heading).to.eql(expected.heading);
        expect(mod.entries).to.eql(expected.entries);
        expect(mod.format).to.eql('text');
    });

    it('gets constructed (specified format)', () => {
        const expected = MODULES['jonbooz/header'];
        const mod = new Module(expected);
        expect(mod.id).to.eql(expected.id);
        expect(mod.heading).to.eql(expected.heading);
        expect(mod.entries).to.eql(expected.entries);
        expect(mod.format).to.eql(expected.format);
    });
});