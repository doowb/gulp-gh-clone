/*!
 * gulp-gh-clone (https://github.com/doowb/gulp-gh-clone)
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */
'use strict';

var path = require('path');
var utils = require('./utils');

/**
 * Returns a vinyl stream that will all the given function for each file coming through.
 * The function should return an array of github repositories to be cloned.
 *
 * ```js
 * var options = {
 *   dest: 'dist',
 *   fn: function(file) {
 *     var data = JSON.parse(file.contents.toString());
 *     return Object.keys(data.dependencies);
 *   }
 * };
 *
 * gulp.task('clone', function() {
 *   return gulp.src('package.json')
 *     .pipe(clone(options));
 * });
 * ```
 * @param  {Object} `options` Options
 * @param  {Function} `options.fn` Function that takes a `file` object and returns an array of github repositories.
 * @param  {String|Function} `options.dest` Destination path to clone the repos to. If a function, then it will be called with the repo name and expect a string to be returned.
 * @return {Stream} Stream to be used in a gulp pipeline.
 * @api public
 */

module.exports = function clone(options) {
  var opts = utils.extend({}, options);
  if (typeof opts.fn !== 'function') {
    throw new Error('expected "options.fn" to be a function');
  }

  var dest = opts.dest;
  if (typeof dest !== 'function') {
    dest = function(key) {
      return path.resolve(opts.dest || process.cwd(), key);
    };
  }

  return utils.through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    var repos = [];
    try {
      repos = opts.fn(file);
    } catch (err) {
      console.log(utils.log.timestamp, utils.log.red(`Error getting repositories for "${file.relative}": ${err}`));
      cb(null, file);
      return;
    }
    repos = Array.isArray(repos) ? repos : Object.keys(repos);

    utils.each(repos, function(key, next) {
      utils.clone({repo: key, dest: dest(key)}, function(err) {
        if (err) {
          console.log(utils.log.timestamp, utils.log.red(`Error cloning "${key}": ${err}`));
        }
        next();
      });
    }, function(err) {
      if (err) return cb(err);
      cb(null, file);
    });
  });
};
