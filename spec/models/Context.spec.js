const sinon = require('sinon');
const expect = require('chai').expect;

const Module = require('../../src/models/Module.js').Module;
const User = require('../../src/models/User.js').User;
const LogLevel = require('../../src/utils/logging/LogLevel.js').LogLevel;
const ConsoleLogger = require('../../src/utils/logging/ConsoleLogger.js').ConsoleLogger;

const Context = require('../../src/models/Context.js').Context;

const MODULES = require('../../../../test-data/modules.json');
const USERS = require('../../../../test-data/users.json');

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
        context.user = user;
        expect(context.user).to.eql(user);
    });

    it('handles modules', () => {
        const modules = [ ];
        for (let k in MODULES) {
            modules.push(new Module(MODULES[k]));
        }

        const context = new Context();
        context.modules = modules;
        expect(context.modules).to.eql(modules);
    });

    it('can get a module by id', () => {
        const modules = [ ];
        for (let k in MODULES) {
            modules.push(new Module(MODULES[k]));
        }

        const context = new Context();
        context.modules = modules;

        const mod = context.getModule('jonbooz/dokkodo');

        expect(mod).to.eql(modules[0]);
    });

    it('handles loggers', () => {
        const context = new Context();
        const logger = new ConsoleLogger(LogLevel.Error);
        context.logger = logger;
        expect(context.logger).to.eql(logger);
    });
})
