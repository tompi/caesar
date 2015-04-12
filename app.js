var caesar = require('./caesar.js');
var fs = require('fs');

if (process.argv.length !== 5) {
  console.log('Usage: node app.js <filename> <numberOfShifts> <encode|decode>');
  process.exit(1);
}

var method = caesar[process.argv[4]];
var numberOfShifts = parseInt(process.argv[3], 10);
var fileName = process.argv[2];

var caesarEncodeStream = caesar.createEncodeStream(2);
var fileStream = fs.createReadStream(fileName, { encoding: 'utf8' });

fileStream
  .pipe(caesarEncodeStream)
  .pipe(process.stdout);
