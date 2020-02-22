import * as sinon from 'sinon';
import {expect} from 'chai';

import {Optional} from '../../sender/utils/Optional';

beforeEach(() => {
    this.sandbox = sinon.createSandbox();
});

afterEach(() => {
    this.sandbox.restore();
});

describe('utils/Optional', () => {
    it('cannot be assigned null', () => {
        expect(Optional.of.bind(Optional, null)).to.throw('Optional.of given null reference');
    });

    it('ofNullable supports either null or non-null', () => {
        const expected = 'expected';
        const nonNull = Optional.ofNullable(expected);
        const nul = Optional.ofNullable(null);

        expect(nonNull.isPresent()).to.be.true;
        expect(nonNull.get()).to.eql(expected);
        expect(nul.isPresent()).to.be.false;
    });

    it('is present', () => {
        const expected = 'expected';
        const opt = Optional.of(expected);

        expect(opt.isPresent()).to.be.true;
        expect(opt.get()).to.eql(expected);
    });

    it('is not present', () => {
        const opt = Optional.empty();

        expect(opt.isPresent()).to.be.false;
        expect(opt.get.bind(opt)).to.throw('Optional.get on empty');
    });

    it('executes when present', () => {
        let init = 0;
        const expected = 1;
        const opt = Optional.of(init);

        opt.ifPresent(() => { init = init + 1; });

        expect(init).to.eql(expected);
    });

    it('does not execute when empty', () => {
        let init = 0;
        const expected = 0;
        const opt = Optional.empty();

        opt.ifPresent(() => { init = init + 1; });

        expect(init).to.eql(expected);
    });

    it('maps a value', () => {
        let init = 0;
        const expected = 1;
        const opt = Optional.of(init);

        const result = opt.map((i) => i + 1);
        expect(result.isPresent()).to.be.true;
        expect(result.get()).to.eql(expected);
    });

    it('does not map when empty', () => {
        const opt = Optional.empty();
        const result = opt.map((i) => i + 1);

        expect(result.isPresent()).to.be.false;

    });

    it('returns itself if present (static)', () => {
        const expected = 1;
        const other = -1;
        const opt = Optional.of(expected);

        expect(opt.orElse(other)).to.eql(expected);
    });

    it('returns else when empty (static)', () => {
        const other = -1;
        const opt = Optional.empty();

        expect(opt.orElse(other)).to.eq(other);
    });

    it('returns itself if present (generator)', () => {
        const expected = 1;
        const other = -1;
        const opt = Optional.of(expected);

        expect(opt.orElseGet(() => other)).to.eql(expected);
    });

    it('returns else when empty (generator)', () => {
        const other = -1;
        const opt = Optional.empty();

        expect(opt.orElseGet(() => other)).to.eql(other);
    });

    it('returns itself if present (throws)', () => {
        const expected = 1;
        const opt = Optional.of(expected);

        expect(opt.orElseThrow(() => new Error('throws'))).to.eql(expected);
    });

    it('throws when empty (throws)', () => {
        const errorGenerator = () => new Error('throws');
        const opt = Optional.empty();

        expect(opt.orElseThrow.bind(opt, errorGenerator)).to.throw('throws');
    });

});
