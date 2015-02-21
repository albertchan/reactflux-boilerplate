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
    reactify   = require('reactify'),
    runTasks   = require('run-sequence'),
    source     = require('vinyl-source-stream'),
    watchify   = require('watchify');

// file locations
var destFile   = './bundle.js',
    destFolder = './js',
    sourceFile = './js/app.js';

// settings
var RELEASE = !!argv.release;

var src = {},
    watch = false;

// Default task
gulp.task('default', ['styles', 'browserify', 'watch']);

// Build scripts with Browserify 
gulp.task('browserify', function() {
    var b = browserify();
    b.transform(reactify);
    b.add(sourceFile) 
    return b.bundle()
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder))
});

// Watch task
gulp.task('watch', function() {
    var b = watchify(sourceFile);
    b.on('update', rebundle)

    function rebundle() {
        return b.bundle()
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder))
    }
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
        .pipe(plugin.if(RELEASE, plugin.minifyCss()))
        .pipe(plugin.if(RELEASE, plugin.rename(function(path) {
            path.basename += '.min';
        })))
        .pipe(gulp.dest('./css'));
});

// Build task
gulp.task('build', function(cb) {
    runTasks(['styles', 'browserify'], cb);
});

// Helpers
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

