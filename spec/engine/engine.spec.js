const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../src/models/Context.js').Context;

const Engine = require('../../src/engine/engine.js');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/Engine', () => {
    it("runs the processors", async () => {
        const context = new Context();

        const engine = new Engine({ process: async (i, c) => 1});
        const output = await engine.run(context);

        expect(output).to.eql(1);
    });
});