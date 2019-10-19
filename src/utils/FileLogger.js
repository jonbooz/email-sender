'use strict';

const fs = require('fs');

module.exports = class FileLogger {
    constructor(filePath) {
        this._filePath = filePath;
    }

    log(message) {
        if (typeof message === 'object') {
            message = JSON.stringify(message, null, 2);
        }
        fs.appendFileSync(this._filePath, message + '\n');
    }
};