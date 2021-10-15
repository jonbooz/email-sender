import * as sinon from 'sinon';
import {expect} from 'chai';

import {ActiveModule} from "../../src/models/ActiveModule";

const USERS = require('../../../../test-data/users.json');

describe('models/ActiveModule', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('gets constructed', () => {
        const expected = USERS['test'].activeModules[0];

        const activeModule = new ActiveModule(expected);

        expect(activeModule.name).to.eql(expected.name);
        expect(activeModule.index).to.eql(expected.index);
    });
});