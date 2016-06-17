'use strict';

require('mocha');
var assert = require('assert');
var gulpGhClone = require('./');

describe('gulp-gh-clone', function() {
  it('should export a function', function() {
    assert.equal(typeof gulpGhClone, 'function');
  });

  it('should export an object', function() {
    assert(gulpGhClone);
    assert.equal(typeof gulpGhClone, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      gulpGhClone();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
