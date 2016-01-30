// Gulp
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var tslint = require("gulp-tslint");
var config = require('./gulpfile.conf');
var path = require('path');
var del = require('del');

// Typescript
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// Node
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var browserSync = require('browser-sync');

gulp.task('less', function () {
    return gulp.src('./src/server/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(insert.prepend('/* This file is generated */\n'))
        .pipe(gulp.dest('src/client/css'));
});

// run mocha tests in the ./tests folder
gulp.task('test', function () {
    return gulp.src('./tests/**/*.spec.js', {
            read: false
        })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('clean', (cb) => {
    del(['src/**/*.js', 'src/**/*.js.map',
        'src/**/*.css', 'tests/**/*.js', 'tests/**/*.js.map',
        '!src', '!tests'
    ]).then(paths => {
        gutil.log('Clean task deleted', paths.length, 'files');
        cb();
    });
});

gulp.task('copy-vendor', function () {
    return gulp.src(config.js)
        .pipe(insert.prepend('/* this file is generated */\n'))
        .pipe(gulp.dest('src/client/vendor/'));
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'src/server/www.js',
        watch: ['src/server/**/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500); // browserSync reload delay
    });
});

// TypeScript build for /src folder, pipes in .d.ts files from typings folder
//var tsConfigSrc = tsb.create('src/tsconfig.json');
var tsConfigSrc = ts.createProject('src/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfigSrc))
        .pipe(sourcemaps.write('../src/'))
        .pipe(gulp.dest('src'));
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', gulp.series(gulp.parallel('build', 'tsLint'), browserSync.reload));
    gulp.watch('tests/**/*.ts', gulp.series(gulp.parallel('buildTests', 'tsLint'), browserSync.reload));
    gulp.watch('src/server/styles/**/*.less', gulp.series('less', browserSync.stream));
    gulp.watch("src/client/**/*.html").on('change', browserSync.reload);
});

gulp.task('watch-test', () => {
    gulp.watch('src/**/*.ts').on('change', gulp.series('build', 'test'));
    gulp.watch('tests/**/*.ts').on('change', gulp.series('buildTests', 'test'));
});

// run browser-sync on for client changes
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/client/**/*.*"],
        browser: "google-chrome",
        port: 7000
    });
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts
var tsConfigTests = ts.createProject('tests/tsconfig.json');
gulp.task('buildTests', function () {
    // pipe in all necessary files
    return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
        .pipe(ts(tsConfigTests))
        .pipe(gulp.dest('tests'));
});

// tslint hte project
gulp.task('tsLint', () => {
    return gulp.src(['src/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
        .pipe(tslint())
        .pipe(tslint.report("prose", {
            emitError: false
        }))
});

gulp.task('buildAll', gulp.series('clean', gulp.parallel('copy-vendor', 'build', 'buildTests', 'less', 'tsLint'), 'test'));
gulp.task('default', gulp.series('buildAll', 'nodemon', 'watch', 'browser-sync'));