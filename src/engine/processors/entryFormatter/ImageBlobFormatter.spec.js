const sinon = require('sinon');
const expect = require('chai').expect;

const fs = require('fs');

const ImageBlobFormatter = require('./ImageBlobFormatter.js');

const RESOURCES = require('../../../../test-data/resources.json');

const IMAGE_PATH = './test-data/red-dot.buffer';
const IMAGE_ENCODING = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==" />';

const LIST_STACK_RESOURCES = async () => {
    return new Promise((resolve, reject) => {
        resolve(RESOURCES)
    });
};

const useRedDot = async (callback) => {
    fs.readFile(IMAGE_PATH, async (err, data) => {
        await callback(data);
    });
};

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('engine/processors/entryFormatter/ImageBlobFormatter', () => {
    it('formats', async () => {
        //useRedDot(async (redDotBuffer) => {
            const redDotBuffer = await fs.readFileSync(IMAGE_PATH);
            const aws = { };
            aws.listStackResources = LIST_STACK_RESOURCES;
            aws.s3 = { };
            aws.s3.getObject = async (bucket, key) => {
                return redDotBuffer;
            };

            const formatter = new ImageBlobFormatter(aws);
            const entry = await formatter.format('mock:entry');
            expect(entry).to.eql(IMAGE_ENCODING);
        //});
    });
});
