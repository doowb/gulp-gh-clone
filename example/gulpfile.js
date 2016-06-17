'use strict';

var gulp = require('gulp');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {d: 'dest'},
  default: {dest: 'dist'}
});

var clone = require('..');

gulp.task('dependencies', function() {
  return gulp.src('package.json')
    .pipe(clone({
      dest: argv.dest,
      fn: function(file) {
        return JSON.parse(file.contents.toString()).dependencies;
      }
    }));
});

gulp.task('devDependencies', function() {
  return gulp.src('package.json')
    .pipe(clone({
      dest: argv.dest,
      fn: function(file) {
        return JSON.parse(file.contents.toString()).devDependencies;
      }
    }));
});

gulp.task('clone', ['dependencies']);
gulp.task('default', ['clone']);
