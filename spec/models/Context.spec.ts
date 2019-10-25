import * as sinon from 'sinon';
import {expect} from 'chai';

import {Module} from '../../src/models/Module';
import {User} from '../../src/models/User';
import {LogLevel} from "../../src/utils/logging/Logger";
import {ConsoleLogger} from "../../src/utils/logging/ConsoleLogger";

import {Context} from "../../src/models/Context";

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
