const sinon = require('sinon');
const expect = require('chai').expect;

const ActiveModule = require('./ActiveModule.js');

const User = require('./User.js');

const USERS = require('../../test-data/users.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('models/User', () => {
    it('gets constructed', () => {
        const expected = USERS['test'];
        const expectedModules = expected.activeModules
                .map((m) => new ActiveModule(m));

        const user = new User(expected);
        expect(user.name).to.eql(expected.name);
        expect(user.email).to.eql(expected.email);
        expect(user.activeModules).to.eql(expectedModules);
    });

    it('gets an active module', () => {
        const expected = USERS['test'];
        const expectedModules = expected.activeModules
                .map((m) => new ActiveModule(m));
        const firstModule = expectedModules[0];

        const user = new User(expected);
        const activeModule = user.getActiveModule("test/dailychallenge");
        
        expect(activeModule).to.eql(firstModule);
    });

    it('tries to get an active module it does not have', () => {
        const user = new User(USERS['test']);
        const activeModule = user.getActiveModule('test/not-a-module');
        expect(activeModule).to.be.undefined;
    });

    it('can check if it has an active module', () => {
        const user = new User(USERS['test']);
        const hasActiveModule = user.hasActiveModule("test/dailychallenge");
        
        expect(hasActiveModule).to.be.true;
    });

    it('can check that it does not have an active module', () => {
        const user = new User(USERS['test']);
        const hasActiveModule = user.hasActiveModule("test/not-a-module");
        
        expect(hasActiveModule).to.be.false;
    });

    it('as json', () => {
        const expected = USERS['test'];
        const user = new User(expected);

        const asJson = user.asJson();
        expected.activeModules = JSON.stringify(expected.activeModules
            .map((m) => new ActiveModule(m))
            .map((am) => am.asJson()));
        
        expect(asJson).to.eql(expected);

        const constructed = new User(asJson);
        
        expect(constructed).to.eql(user);
    });
});