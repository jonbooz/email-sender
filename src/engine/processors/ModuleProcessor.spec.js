const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../models/Context.js');
const User = require('../../models/User.js');

const ModuleProcessor = require('./ModuleProcessor.js');

const USERS = require('../../../test-data/users.json');
const MODULES = require('../../../test-data/modules.json');

const EXPECTED_INPUT = require('../../../test-data/processor-output-ModuleSortingProcessor.json');
const EXPECTED_OUTPUT = require('../../../test-data/processor-output-ModuleProcessor.json');
const MODULE_PROCESSOR_OUTPUT = JSON.parse(JSON.stringify(EXPECTED_OUTPUT));
    // I'm doing this because EXPECTED_OUTPUT seems to turn into EntryProcessor output when the function runs

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/ModuleProcessor', () => {
    it("get's the current active entry for each module for the user", async () => {
        const user = new User(USERS['test']);
        const modules = MODULES['test'];

        const context = new Context();
        context.setUser(user);

        const dataStore = { };
        dataStore.getModules = async (user) => new Promise((resolve, reject) => resolve(modules));


        const processor = new ModuleProcessor(dataStore);
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(MODULE_PROCESSOR_OUTPUT);
    });
});