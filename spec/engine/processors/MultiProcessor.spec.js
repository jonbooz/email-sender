
const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js').Context;
const LogLevel = require('../../../src/utils/logging/LogLevel.js').LogLevel;
const ConsoleLogger = require('../../../src/utils/logging/ConsoleLogger.js').ConsoleLogger;

const MultiProcessor = require('../../../src/engine/processors/MultiProcessor.js').MultiProcessor;

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/MultiProcessor', () => {
    it("runs the processors", async () => {
        const context = new Context();
        context.logger = new ConsoleLogger(LogLevel.Error);

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