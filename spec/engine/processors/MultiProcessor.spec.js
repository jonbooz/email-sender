const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js');

const MultiProcessor = require('../../../src/engine/processors/MultiProcessor.js');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/MultiProcessor', () => {
    it("runs the processors", async () => {
        const context = new Context();
        context.setLogLevel('error');
        context.setLogger(console);

        const processors = [
            {
                process: async (input, context) => 0
            },
            {
                process: async (input, context) => input + 1
            },
            {
                process: async (input, context) => "" + input 
            }
        ];

        const engine = new MultiProcessor(processors);
        const output = await engine.process(null, context);

        expect(output).to.eql("1");
    });
});