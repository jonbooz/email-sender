const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js');
const User = require('../../../src/models/User.js');

const UserUpdateProcessor = require('../../../src/engine/processors/UserUpdateProcessor.js');

const USERS = require('../../../test-data/users.json');
const MODULES = require('../../../test-data/modules.json');

const EXPECTED_INPUT = require('../../../test-data/processor-output-EmailSender.json');
const EXPECTED_OUTPUT = require('../../../test-data/processor-output-UserUpdateProcessor.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/UserUpdateProcessor', () => {
    it("updates a user's data based on the sent email", async () => {
        const user = new User(USERS['test']);
        user._buildActiveModuleSet();
        const modules = MODULES['test'];

        const context = new Context();
        context.setUser(user);
        context.setModules(modules);

        const dataStore = { };
        dataStore.saveUser = async (user) => null;

        const processor = new UserUpdateProcessor(dataStore);
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});