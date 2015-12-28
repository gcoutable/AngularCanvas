'use strict';

var gulp = require('gulp');

var root_folder = process.cwd();
console.log(root_folder);

/**
 * Loads plugins into $.pluginName with plugin name contain gulp-*
 */
var $ = require('gulp-load-plugins')({
  DEBUG: true,
  config: root_folder + '\\package.json'
});

gulp.task('connect', function () {
  var connect = require('connect');
  var serve_static = require('serve-static');
  var serve_index = require('serve-index');
  
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(serve_static('app'))
    .use(serve_index('app'));
    
    require('http').createServer(app)
      .listen(9000)
      .on('listening', function () {
        console.log('Started connect web server on http://localhost:9000');
      });
});

gulp.task('watch', function () {
  $.livereload.listen();
  
  gulp.watch([
    'app/**/*.html',
    'app/components/**/*.js',
    'app/components/**/*.css'
  ]).on('change', function (file) {
    $.livereload.changed(file.path);
  });
});

gulp.task('default', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});