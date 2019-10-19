const sinon = require('sinon');
const expect = require('chai').expect;

const Configurator = require('../../src/engine/configurator.js');
const Context = require('../../src/models/Context.js');
const User = require('../../src/models/User.js');

const Engine = require('../../src/engine/engine.js');

const USERS = require('../../test-data/users.json');
const MODULES = require('../../test-data/modules.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/Engine', () => {
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

        const engine = new Engine(processors);
        const output = await engine.run(context)

        expect(output).to.eql("1");
    });
});