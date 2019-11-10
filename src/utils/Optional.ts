export class Optional<T> {
    private readonly _val: T | null;
    private readonly _empty: boolean;

    constructor(val?: T) {
        this._empty = (val === undefined || val === null);
        this._val = val;
    }

    static of<T>(val: T): Optional<T> {
        if (val === undefined || val === null) {
            throw new Error('NullPointer');
        }
        return new Optional<T>(val);
    }

    static empty<T>(): Optional<T> {
        return new Optional<T>();
    }

    static ofNullable<T>(val?: T): Optional<T> {
        return new Optional<T>(val);
    }

    get(): T {
        if (this._empty) {
            throw new Error('NullPointer');
        } else {
            return this._val;
        }
    }

    isPresent(): boolean {
        return !this._empty;
    }

    ifPresent(callback: (T) => void): void {
        if (this.isPresent()) {
            callback(this._val);
        }
    }

    map<R>(callback: (T) => R): Optional<R> {
        if (this.isPresent()) {
            return Optional.of(callback(this._val));
        } else {
            return Optional.empty();
        }
    }
}