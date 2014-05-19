'use strict';

var livereloadport = 35729,
	serverport = 5001, 

	path = require('path'),

	gulp = require('gulp'),
	runSequence = require('run-sequence'),
	shell = require('gulp-shell'),

	gulpsass = require('gulp-sass'),
	bourbon = require('node-bourbon').includePaths,

	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),


	express = require('express'),
	server = express(),
	livereload = require('connect-livereload');

server.use(express.static(path.resolve('./dist')));

gulp.task('bower', 
	shell.task([
		'"./node_modules/.bin/bower" install'
	], {ignoreErrors: true})
);

gulp.task('styles', function () {
	return gulp.src(['./src/assets/scss/*.scss'])
		.pipe(gulpsass({
			//outputStyle: 'expanded',
			outputStyle: 'compressed', 
			sourceComments: 'map',
			includePaths: [
				'./src/assets/scss/theme',
				"./src/vendor/bootstrap-sass-official/vendor/assets/stylesheets",
				"./src/vendor/font-awesome/scss"
			].concat(bourbon),
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('html', function() {
	return gulp.src(["./src/**/*", "!./src/assets/**", "!./src/vendor{,/**}"])
		.pipe(gulp.dest('./dist'));
});

gulp.task('bootstrap:js', function() {
  gulp.src('./src/vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/*.js')
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
});

gulp.task('bootstrap:font', function() {
	return gulp.src(["./src/vendor/bootstrap-sass-official/vendor/assets/fonts/bootstrap/**"])
		.pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('fontawesome:font', function() {
	return gulp.src([ "./src/vendor/font-awesome/fonts/**"])
		.pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('serve', function() {
	server.listen(serverport);
});

gulp.task('watch', function () {
	// gulp.watch('src/assets/js/**', ['lint','app', 'core']);
	// gulp.watch('src/assets/jsext/**', ['extscripts']);
	// gulp.watch('src/assets/scss/**', ['styles']);
	// gulp.watch('src/assets/icons/**', ['iconfont']);
	// gulp.watch('src/assets/img/**', ['img']);
	// gulp.watch(['src/**/*.*',  "!src/**/*.hbs", '!src/assets/**'], ['html']);
	// gulp.watch(['src/**/*.hbs', '!src/assets/**'], ['yassemble']);
	// gulp.watch(['src/assets/yassemble/**/*.hbs'], ['yassemble']);
});

gulp.task('build', function(done) {
	runSequence('bower', ['styles', 'html', 'bootstrap:js', 'bootstrap:font', 'fontawesome:font'], done);
});

gulp.task('run', function(done) {
	runSequence('build', 'serve', 'watch', done);
});

gulp.task('default', ['build']);