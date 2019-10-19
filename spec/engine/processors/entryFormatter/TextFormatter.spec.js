const sinon = require('sinon');
const expect = require('chai').expect;

const TextFormatter = require('../../../../src/engine/processors/entryFormatter/TextFormatter.js');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/entryFormatter/TextFormatter', () => {
    it('formats', async () => {
        const expected = 'identity';
        const formatter = new TextFormatter();
        const result = await formatter.format(expected);
        expect(result).to.eql(expected);
    })
});