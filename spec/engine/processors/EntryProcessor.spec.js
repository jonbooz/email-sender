const sinon = require('sinon');
const expect = require('chai').expect;

const Context = require('../../../src/models/Context.js').Context;
const User = require('../../../src/models/User.js').User;

const TextFormatter = require('../../../src/engine/processors/entryFormatter/TextFormatter.js');
const ImageBlobFormatter = require('../../../src/engine/processors/entryFormatter/ImageBlobFormatter.js');

const EntryProcessor = require('../../../src/engine/processors/EntryProcessor.js');

const IMAGE_ENCODING = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==" />';
const USERS = require('../../../../../test-data/users.json');
const MODULES = require('../../../../../test-data/modules.json');

const EXPECTED_INPUT = require('../../../../../test-data/processor-output-ModuleProcessor.json');
const EXPECTED_OUTPUT = require('../../../../../test-data/processor-output-EntryProcessor.json');

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/EntryProcessor', () => {
    it("formats the module entries for presentation", async () => {
        const user = new User(USERS['test']);

        const context = new Context();
        context.setUser(user);

        const formatters = {
            text: new TextFormatter(),
            imageBlob: {
                format: (entry) => IMAGE_ENCODING
            }
        };

        const processor = new EntryProcessor(formatters);
        const output = await processor.process(EXPECTED_INPUT, context);

        expect(output).to.eql(EXPECTED_OUTPUT);
    });
});