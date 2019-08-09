'use strict';

/**
 * This Formatter takes a string and returns it.
 * 
 * This can be considered as an IdentityFormatter.
 */
module.exports = class TextFormatter {
    async format(entry) {
        return entry;
    }
}