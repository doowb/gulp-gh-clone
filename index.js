/*!
 * gulp-gh-clone (https://github.com/doowb/gulp-gh-clone)
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */
'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(options) {
  var opts = utils.extend({prop: 'dependencies'}, options);

  return utils.through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    var data;
    try {
      data = JSON.parse(file.contents.toString());
    } catch (err) {
      console.log(utils.log.timestamp, utils.log.red(`Error parsing contents for "${file.relative}": ${err}`));
      return cb(null, file);
    }

    var dependencies = data[opts.prop] || {};
    utils.each(Object.keys(dependencies), function(key, next) {
      utils.clone({repo: key, dest: path.resolve(opts.dest || process.cwd(), key)}, function(err) {
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
