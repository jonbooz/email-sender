const sinon = require('sinon');
const expect = require('chai').expect;

const Module = require('../../src/models/Module.js').Module;
const User = require('../../src/models/User.js').User;

const DataStore = require('../../src/services/DataStore.js');

const RESOURCES = require('../../../../test-data/resources.json');
const USERS = require('../../../../test-data/users.json');
const MODULES = require('../../../../test-data/modules.json');

const LIST_STACK_RESOURCES = async () => {
    return new Promise((resolve, reject) => {
        resolve(RESOURCES);
    });
};

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('services/DataStore', () => {
    it('gets a user', async () => {
        const aws = { };
        aws.listStackResources = LIST_STACK_RESOURCES;
        aws.ddb = { };
        aws.ddb.read = async (table, params) => {
            return USERS['test'];
        };

        const dataStore = new DataStore(aws);
        const user = await dataStore.getUser('user');
        const expectedUser = new User(USERS['test']);
        expect(user).to.eql(expectedUser);
    });

    it('saves a user', async () => {
        let checkCall = { };
        const expectedUser = new User(USERS['test']);
        const expectedValues = {
            table: RESOURCES['usersTable'],
            user: expectedUser
        };

        const aws = { };
        aws.listStackResources = LIST_STACK_RESOURCES;
        aws.ddb = { };
        aws.ddb.save = async (table, params) => {
            checkCall.table = table;
            checkCall.user = params;
        };

        const dataStore = new DataStore(aws);
        await dataStore.saveUser(expectedUser);
        expect(checkCall).to.eql(expectedValues);
    });

    it('gets a module', async () => {
        const aws = { };
        aws.listStackResources = LIST_STACK_RESOURCES;
        aws.ddb = { };
        aws.ddb.read = async (table, params) => {
            return MODULES['test/dokkodo'];
        };

        const dataStore = new DataStore(aws);
        const mod = await dataStore.getModule('test/dokkodo');
        const expectedMod = new Module(MODULES['test/dokkodo']);
        expect(mod).to.eql(expectedMod);
    });

    it('gets modules for user', async () => {
        const expectedMod0 = new Module(MODULES['test/dokkodo']);
        const expectedMod1 = new Module(MODULES['test/header']);

        const aws = { };
        aws.listStackResources = LIST_STACK_RESOURCES;
        aws.ddb = { };
        aws.ddb.scan = async (table, expression, value, names) => {
            return [MODULES['test/dokkodo'], MODULES['test/header']];
        };

        const dataStore = new DataStore(aws);
        const mod = await dataStore.getModules('test');
        expect(mod[0]).to.eql(expectedMod0);
        expect(mod[1]).to.eql(expectedMod1);
    });

    it('saves a module', async () => {
        let checkCall = { };
        const expectedModule = new Module(MODULES['test/header']);
        const expectedValues = {
            table: RESOURCES['modulesTable'],
            user: expectedModule
        };

        const aws = { };
        aws.listStackResources = LIST_STACK_RESOURCES;
        aws.ddb = { };
        aws.ddb.save = async (table, params) => {
            checkCall.table = table;
            checkCall.user = params;
        };

        const dataStore = new DataStore(aws);
        await dataStore.saveModule(expectedModule);
        expect(checkCall).to.eql(expectedValues);
    });

});

