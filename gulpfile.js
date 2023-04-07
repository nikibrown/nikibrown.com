const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

browserSync.init({
    server: {
        baseDir: './docs',
        index: '/index.html'
    }
});

function style() {
    return gulp
        .src('./src/assets/scss/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./docs/assets/css'));
}

function moveimg() {
    return gulp.src(['./src/assets/img/*']).pipe(gulp.dest('./docs/assets/img'));
}

function movejs() {
    return gulp.src(['./src/assets/js/*']).pipe(gulp.dest('./docs/assets/js'));
}

function include() {
    return gulp
        .src(['./src/*.html'])
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file'
            })
        )
        .pipe(gulp.dest('./docs'));
}

exports.default = function () {
    gulp.watch('./src/**/*').on(
        'change',
        series(include, style, moveimg, movejs, browserSync.reload)
    );
    console.log('gulp watch');
};