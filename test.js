'use strict';

require('mocha');
var assert = require('assert');
var clone = require('./');

describe('gulp-gh-clone', function() {
  it('should export a function', function() {
    assert.equal(typeof clone, 'function');
  });
});
