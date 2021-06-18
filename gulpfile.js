// "use strict";

// var gulp = require("gulp"),
// 	sass = require("gulp-sass");

// // Define tasks after requiring dependencies
// function style() {
// 	// Where should gulp look for the sass files?
// 	// My .sass files are stored in the styles folder
// 	// (If you want to use scss files, simply look for *.scss files instead)
// 	return (
// 		gulp
// 			.src("assets/scss/*.scss")

// 			// Use sass with the files found, and log any errors
// 			.pipe(sass())
// 			.on("error", sass.logError)

// 			// What is the destination for the compiled file?
// 			.pipe(gulp.dest("assets/css"))
// 	);
// }

// // Expose the task by exporting it
// // This allows you to run it from the commandline using
// // $ gulp style
// exports.style = style;

// function watch() {
// 	// gulp.watch takes in the location of the files to watch for changes
// 	// and the name of the function we want to run on change
// 	gulp.watch("assets/scss/**/*.scss", style);
// }

// // Don't forget to expose the task!
// exports.watch = watch;




const { watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
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