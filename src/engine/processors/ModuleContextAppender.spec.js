const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../models/Context.js');

const ModuleContextAppender = require('./ModuleContextAppender.js');

const EXPECTED_INPUT = require('../../../test-data/processor-output-ModuleRetriever.json');
const EXPECTED_OUTPUT = require('../../../test-data/processor-output-ModuleContextAppender.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/ModuleContextAppender', () => {
    it('appends input modules to context', async () => {
        const context = new Context();

        const dataStore = { };

        const processor = new ModuleContextAppender(dataStore);
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
        expect(context.getModules()).to.eql(EXPECTED_INPUT);
    });
});