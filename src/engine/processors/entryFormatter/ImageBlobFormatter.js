'use strict';

const AwsUtils = require('aws-utils');

const IMAGE_BLOB_PREFIX = 'data:image/png;base64,';

module.exports = class ImageBlobFormatter {
    /**
     * @param {AwsUtils} aws
     */
    constructor(aws) {
        this._aws = aws;
    }

    /**
     * This formats an image blob taken from an image file stored in S3.
     * 
     * The entry should be in the form: `bucket:key`
     * 
     * @param {string} entry 
     */
    async format(entry) {
        let imageLocation = entry.split(':');
        let bucket = imageLocation[0];
        let key = imageLocation[1];
        
        let imageBuffer = await this._aws.s3.getObject(bucket, key);
        let imageBytes = new Uint8Array(imageBuffer);
        let imageBlob = IMAGE_BLOB_PREFIX + encode(imageBytes);

        return '<img src="' + imageBlob + '" />';
    }
};

function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
