function shift(value, numberOfShifts) {
  var ret = '';
  // Loop over string and shift each character
  value.split('').forEach(function(character) {
    var charCode = character.charCodeAt() - 65;
    // Only treat uppercase english letters...
    if (charCode >= 0 && charCode < 27) {
      var shiftedCharCode = (charCode + 26 + numberOfShifts) % 26;
      ret += String.fromCharCode(shiftedCharCode + 65);
    } else {
      ret += character;
    }
  });
  return ret;
}

function encode(value, numberOfShifts) {
  return shift(value, numberOfShifts);
};

function decode(value, numberOfShifts) {
  return shift(value, numberOfShifts * -1);
}

var Transform = require('stream').Transform;

function createStream(numberOfShifts, shifter) {
  var stream = new Transform();
  stream._transform = function(chunk, encoding, next) {
    stream.push(shifter(chunk.toString(), numberOfShifts));
    next();
  };
  return stream;
};

exports.createEncodeStream = function(numberOfShifts) {
  return createStream(numberOfShifts, encode);
};

exports.createDecodeStream = function(numberOfShifts) {
  return createStream(numberOfShifts, decode);
};
