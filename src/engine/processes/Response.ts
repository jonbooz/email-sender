export class Response<T> {
    constructor(private readonly _response: T,
                private readonly _error?: Error) {

    }

    get response(): T {
        return this._response;
    }

    get error(): Error {
        return this._error;
    }

    static of<T>(resp: T): Response<T> {
        return new Response<T>(resp);
    }

    static error<T>(error: Error): Response<T> {
        return new Response<T>(null, error);
    }
}