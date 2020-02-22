import * as sinon from 'sinon';
import {expect} from 'chai';

import {ActiveModule} from "../../sender/models/ActiveModule";

const USERS = require('../../../../test-data/users.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('models/ActiveModule', () => {
    it('gets constructed', () => {
        const expected = USERS['test'].activeModules[0];

        const activeModule = new ActiveModule(expected);

        expect(activeModule.name).to.eql(expected.name);
        expect(activeModule.index).to.eql(expected.index);
    });
});