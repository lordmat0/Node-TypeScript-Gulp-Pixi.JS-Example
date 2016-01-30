var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var ts = require('gulp-typescript');
var config = require('./gulpfile.conf');
var concat = require('gulp-concat');
var tslint = require("gulp-tslint");
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function () {
    return gulp.src('./src/server/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        // TODO add a note stating that these are generated
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
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('copy-vendor', function () {
    return gulp.src(config.js)
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
    gulp.watch('src/**/*.ts', gulp.parallel('build', 'tsLint', browserSync.reload));
    gulp.watch('tests/**/*.ts', gulp.parallel('buildTests', 'tsLint'));
    gulp.watch('src/server/styles/**/*.less', gulp.parallel('less'));
    gulp.watch("src/client/**/*.html").on('change', browserSync.reload);
    gulp.watch("src/client/**/*.js").on('change', browserSync.reload);
    gulp.watch("src/client/**/*.css").on('change', browserSync.stream);
});

gulp.task('watch-test', () => {
    gulp.watch('src/**/*.ts').on('change', gulp.series('build', 'test'));
    gulp.watch('tests/**/*.ts').on('change', gulp.series('buildTests', 'test'));
});

// run browser-sync on for client changes
gulp.task('browser-sync', gulp.series('copy-vendor', 'nodemon', 'watch'), function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/client/**/*.*"],
        browser: "google-chrome",
        port: 7000
    });
});

// gulp.task('build', ['buildServer', 'buildClient']);
//
// gulp.task('buildServer', function () {
//     return gulp.src(['typings/**/*.ts', 'src/server/**/*.ts'])
//         .pipe(sourcemaps.init())
//         .pipe(ts(tsConfigSrc))
//         .pipe(sourcemaps.write('../../src/server/source'))
//         .pipe(gulp.dest('src/server'));
// });
//
// gulp.task('buildClient', function () {
//     return gulp.src(['typings/**/*.ts', 'src/client/**/*.ts'])
//         .pipe(sourcemaps.init())
//         .pipe(ts(tsConfigSrc))
//         .pipe(sourcemaps.write('../../src/client/source'))
//         .pipe(gulp.dest('src/client'));
// });

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
gulp.task('default', gulp.series('browser-sync'));