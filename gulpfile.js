'use strict';

var gulp = require('gulp'),
	rimraf = require('rimraf');


gulp.task('clean', function (cb) {
	rimraf("./dist", cb);
});

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	babel = require("gulp-babel");

gulp.task('scripts', function () {
	return gulp.src("./src/**/*.js")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("fastsite.js"))
		.pipe(gulp.dest("./dist"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist"));
});

gulp.task('build', [ 'clean' ], function () {
	gulp.start('scripts');
});

gulp.task('watch', function () {
	gulp.watch("./src/**/*.js", function() {
		gulp.run('scripts');
	});
});

gulp.task('default', [ 'build', 'watch' ]);