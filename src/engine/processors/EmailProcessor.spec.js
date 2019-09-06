const sinon = require('sinon');
const expect = require('chai').expect;

const EmailProcessor = require('./EmailProcessor.js');

const EXPECTED_INPUT = require('../../../test-data/processor-output-EntryProcessor.json');
const EXPECTED_OUTPUT = require('../../../test-data/processor-output-EmailProcessor.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/EmailProcessor', () => {
    it("formats the entries into a single email to send", async () => {
        const processor = new EmailProcessor();
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});