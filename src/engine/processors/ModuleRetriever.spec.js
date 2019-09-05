const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../models/Context.js');
const User = require('../../models/User.js');

const ModuleRetriever = require('./ModuleRetriever.js');

const USERS = require('../../../test-data/users.json');
const MODULES = require('../../../test-data/modules.json');

const EXPECTED_OUTPUT = require('../../../test-data/processor-output-ModuleRetriever.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/ModuleRetriever', () => {
    it('processes input', async () => {
        const user = new User(USERS['test']);
        const modules = MODULES['test'];

        const context = new Context();
        context.setUser(user);

        const dataStore = { };
        dataStore.getModules = async (user) => new Promise((resolve, reject) => resolve(modules));

        const processor = new ModuleRetriever(dataStore);
        const output = await processor.process(null, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});