'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    rigger = require("gulp-rigger"),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    livereload = require('gulp-livereload');

var path = {
    build: {
        css: 'app/css/',
    },
    src: {
        style: 'app/sass/**/*.*'
    },
    watch: {
        style: 'app/sass/**/*.*'
    },
    clean: './'
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        //.pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(prefixer())
        .pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('sassLint', function () {
    return gulp.src('app/sass/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('build', [
    'style:build'
]);

gulp.task('watch', function () {
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
});

gulp.task('views', function buildHTML() {
return gulp.src('app//*.pug')
.pipe(watch('app//*.pug'))
.pipe(pug({ yourTemplate: 'Locals' }))
.pipe(gulp.dest('app/'))
.pipe(livereload({ start: true }));
});

gulp.task('default', ['build', 'browser-sync', 'watch', 'views']);
