/*
 * React/Flux Boilerplate
 * Copyright (c) 2015, Albert Chan
 * All rights reserved.
 *
 */

// dependencies
var argv       = require('minimist')(process.argv.slice(2)),
    browserify = require('browserify'),
    gulp       = require('gulp'),
    plugin     = require('gulp-load-plugins')(),
    runTasks   = require('run-sequence'),
    source     = require('vinyl-source-stream'),
    watchify   = require('watchify');

// file locations
var destFolder = './js',
    destFile   = './js/bundle.js',
    sourceFile = './js/app.js';

// settings
var RELEASE = !!argv.release;

var src = {},
    watch = false;

// Default task
gulp.task('default', ['styles']);

// Browserify
gulp.task('browserify', function() {

});

// CSS style sheets
gulp.task('styles', function() {
    src.styles = 'src/less/**/*.{css,less}';
    return gulp.src('src/less/screen.less')
        .pipe(plugin.plumber())
        .pipe(plugin.less({
            sourceMap: !RELEASE,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./css'));
});

// Build the app from source code
gulp.task('build', function(cb) {
    runTasks(['styles'], cb);
});