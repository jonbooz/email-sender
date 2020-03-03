#!/usr/local/bin/node

const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const Environment = require('../build/tsc/src/engine/environment.js').Environment;
const Module = require('../build/tsc/src/models/Module.js').Module;

const env = new Environment();
const dataStore = env.getDataStore();

class KindleNotes {

    constructor(path) {
        this.filePath = path;
        this.entries = [ ];
    }

    load() {
        const inputStream = Fs.createReadStream(this.filePath, 'utf8');
        return new Promise((resolve, reject) => {
            inputStream.pipe(new CsvReadableStream({parseNumbers: true, parseBooleans: true, trim: true}))
                .on('data', (row) => {
                    this._filterRows(row);
                })
                .on('end', (data) => {
                    this._rollUpNotes();
                    resolve(data);
                })
        });
    }

    _filterRows(row) {
        if (row[0] === 'Note' || row[0].startsWith('Highlight')) {
            this.entries.push(row);
        }
    }

    _rollUpNotes() {
       const rawEntries = this.entries;
       this.entries = [ ];
       const lastIndex = rawEntries.length - 1;
       for (let i = 0; i < rawEntries.length; ++i) {
           let entry = "<p>" + rawEntries[i][3] + "</p>";
           if (i !== lastIndex && rawEntries[i+1][0] === 'Note') {
               entry += "<p><em>" + rawEntries[i+1][3] + "</em></p>";
               ++i;
           }
           entry += "<p><small>(" + rawEntries[i][1] + ")</small></p>";
           this.entries.push(entry);
       }
    }
}

if (process.argv.length < 5) {
    throw "Usage: ./import-kindle-notes <kindle-notes.csv> <title> <id>";
}

const notesFile = process.argv[2];
const bookTitle = process.argv[3];
const bookId = process.argv[4];

const notes = new KindleNotes(notesFile);

(async () => {
    await notes.load();

    const mod = new Module({
        id: bookId,
        heading: bookTitle,
        entries: notes.entries
    });

    console.log(mod);
    await dataStore.saveModule(mod);
})();

