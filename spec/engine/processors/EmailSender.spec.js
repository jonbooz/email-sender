const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js').Context;
const User = require('../../../src/models/User.js').User;

const EmailSender = require('../../../src/engine/processors/EmailSender.js');

const USERS = require('../../../../../test-data/users.json');

const EXPECTED_OUTPUT = require('../../../../../test-data/processor-output-EmailSender.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/EmailSender', () => {
    it("sends the email", async () => {
        const user = new User(USERS['test']);

        const context = new Context();
        context.setUser(user);

        const aws = { };
        aws.ses = { };
        aws.ses.sendEmail = async () => null;

        const processor = new EmailSender(aws);
        const output = await processor.process(EXPECTED_OUTPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});