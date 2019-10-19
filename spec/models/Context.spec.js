const sinon = require('sinon');
const expect = require('chai').expect;

const Module = require('../../src/models/Module.js');
const User = require('../../src/models/User.js');

const Context = require('../../src/models/Context.js');

const MODULES = require('../../test-data/modules.json');
const USERS = require('../../test-data/users.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('models/Context', () => {
    it('handles users', () => {
        const user = new User(USERS['test']);
        const context = new Context();
        context.setUser(user);
        expect(context.getUser()).to.eql(user); 
    });

    it('handles modules', () => {
        const modules = [ ];
        for (let k in MODULES) {
            modules.push(new Module(MODULES[k]));
        }

        const context = new Context();
        context.setModules(modules);
        expect(context.getModules()).to.eql(modules);
    });

    it('can get a module by id', () => {
        const modules = [ ];
        for (let k in MODULES) {
            modules.push(new Module(MODULES[k]));
        }

        const context = new Context();
        context.setModules(modules);

        const mod = context.getModule('jonbooz/dokkodo');

        expect(mod).to.eql(modules[0]);
    });

    it('handles log levels', () => {
        const expected = 'debug';
        const context = new Context();
        context.setLogLevel(expected);
        expect(context.getLogLevel()).to.eql(expected);
    });

    it('handles loggers', () => {
        const context = new Context();
        context.setLogger(console);
        expect(context.getLogger()).to.eql(console);
    });
})
