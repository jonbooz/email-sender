const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js');
const User = require('../../../src/models/User.js');

const ModuleSortingProcessor = require('../../../src/engine/processors/ModuleSortingProcessor.js');

const USERS = require('../../../test-data/users.json');
const MODULES = require('../../../test-data/modules.json');

const EXPECTED_INPUT = require('../../../test-data/processor-output-ModuleContextAppender.json');
const EXPECTED_OUTPUT = require('../../../test-data/processor-output-ModuleSortingProcessor.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/ModuleSortingProcessor', () => {
    it("sorts modules based on the user's active module order", async () => {
        const user = new User(USERS['test']);
        const modules = MODULES['test'];

        const context = new Context();
        context.setUser(user);

        const dataStore = { };
        dataStore.getModules = async (user) => new Promise((resolve, reject) => resolve(modules));

        const processor = new ModuleSortingProcessor(dataStore);
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});