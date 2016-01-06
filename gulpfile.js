var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');
var config = require('./gulpfile.conf');
var concat = require('gulp-concat');


// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('./src/server/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        // TODO add a note stating that these are generated
        .pipe(gulp.dest('./src/client/stylesheets'));
});

// run mocha tests in the ./tests folder
gulp.task('test', function () {

    return gulp.src('./tests/**/*.spec.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha());
});

// run browser-sync on for client changes
gulp.task('browser-sync', ['concat-vendor', 'nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/client/**/*.*"],
        browser: "chromium",
        port: 7000
    });
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
        }, 500);  // browserSync reload delay
    });
});

gulp.task('concat-vendor', function () {
    return gulp.src(config.js)
        .pipe(concat('vendor.js'))
        // TODO add a note stating that these are generated
        .pipe(gulp.dest('src/client/'));
});

// TypeScript build for /src folder, pipes in .d.ts files from typings folder 
var tsConfigSrc = tsb.create('src/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(tsConfigSrc())
        .pipe(gulp.dest('src'));
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts 
var tsConfigTests = tsb.create('tests/tsconfig.json');
gulp.task('buildTests', function () {
    // pipe in all necessary files
    return gulp.src(['typings/**/*.ts', 'tests/**/*.ts', 'src/tsd.d.ts'])
        .pipe(tsConfigTests())
        .pipe(gulp.dest('tests'));
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
    gulp.watch('src/server/styles/**/*.less', ['less']);
    gulp.watch("src/client/**/*.html").on('change', browserSync.reload);
    gulp.watch("src/client/**/*.js").on('change', browserSync.reload);
    gulp.watch("src/client/**/*.css").on('change', browserSync.stream);
});

gulp.task('watch-test', () => {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
    gulp.watch(['tests/**/*.js', 'src/**/*.js' ], ['test'])
});

gulp.task('buildAll', ['concat-vendor','build', 'buildTests', 'less']);
gulp.task('default', ['browser-sync']);
