const sinon = require('sinon');
const expect = require('chai').expect;

const ActiveModule = require('./ActiveModule.js');

const USERS = require('../../test-data/users.json');

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
        expect(activeModule.repeats).to.eql(expected.repeats);
        expect(activeModule.index).to.eql(expected.index);
        expect(activeModule.times).to.eql(expected.times);
    });

    it('as json', () => {
       const expected = USERS['test'].activeModules[0];
       const activeModule = new ActiveModule(expected);
       
       const asJson = activeModule.asJson();
       expect(asJson).to.eql(expected);

       const constructed = new ActiveModule(asJson);

       expect(constructed).to.eql(activeModule);
    });
});