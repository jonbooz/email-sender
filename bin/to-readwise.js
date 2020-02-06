#!/usr/local/bin/node

const Module = require('../build/tsc/src/models/Module.js').Module;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

if (process.argv.length < 3) {
    throw "to-readwise requires a json file with module details";
}

console.log(process.argv[2]);
const moduleToLoad = require(process.argv[2]);
console.log(moduleToLoad);

const csvContents = [];

const mod = new Module(moduleToLoad);
for (let i = 0; i < mod.entries.length; ++i) {
    csvContents.push({
        highlight: mod.entries[i],
        title: mod.heading
    });
}

const csvWriter = createCsvWriter({
    path: 'data/readwise.csv',
    header: [
        {id: 'highlight'},
        {id: 'title'}
    ]
});

csvWriter.writeRecords(csvContents)
        .then(() => {
            console.log('done');
        });

