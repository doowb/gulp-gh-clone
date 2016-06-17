/*!
 * gulp-gh-clone (https://github.com/doowb/gulp-gh-clone)
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('gulp-gh-clone');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('gulp-gh-clone')) return;

    this.define('gulp-gh-clone', function() {
      debug('running gulp-gh-clone');
      
    });
  };
};
