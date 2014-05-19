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
	livereload = require('connect-livereload'),

	browserify = require('browserify'),
	browserify_shim = require('browserify-shim'),
	exorcist = require('exorcist'),
	source = require('vinyl-source-stream'),

	jshint = require('gulp-jshint'),

	font = require('gulp-iconfont');

server.use(express.static(path.resolve('./dist')));

gulp.task('bower', 
	shell.task([
		'"./node_modules/.bin/bower" install'
	], {ignoreErrors: true})
);

gulp.task('styles', function () {
	return gulp.src(['./src/assets/scss/*.scss'])
		.pipe(gulpsass({
			outputStyle: 'expanded',
			//outputStyle: 'compressed', 
			sourceComments: 'map',
			includePaths: [
				'./src/assets/scss/theme',
				'./src/vendor/bootstrap-sass-official/vendor/assets/stylesheets',
				'./src/vendor/font-awesome/scss'
			].concat(bourbon),
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('html', function() {
	return gulp.src(['./src/**/*', '!./src/assets/**', '!./src/vendor{,/**}'])
		.pipe(gulp.dest('./dist'));
});

gulp.task('font', function(){
	return gulp.src(['./src/assets/font/*.svg'])
		.pipe(font({
			fontName: 'bmfont',
			appendCodepoints: true, // recommanded option
			descent:  -256,
			fontHeight: 1792,
			fontWidth: 1536
		}))
		.pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('bootstrap:js', function() {
  
  var files = [
  	'affix.js',
	'alert.js',
	'button.js',
	'carousel.js',
	'collapse.js',
	'dropdown.js',
	'tab.js',
	'transition.js',
	'scrollspy.js',
	'modal.js',
	'tooltip.js',
	'popover.js'
  ];

	var paths = [];
	for (var i=0; i<files.length; i++) {
		paths.push('./src/vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/'+files[i]);
	} 

  return gulp.src(paths)
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
});

gulp.task('bootstrap:font', function() {
	return gulp.src(['./src/vendor/bootstrap-sass-official/vendor/assets/fonts/bootstrap/**'])
		.pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('fontawesome:font', function() {
	return gulp.src([ './src/vendor/font-awesome/fonts/**'])
		.pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('jquery:js', function() {
	return gulp.src([ './src/vendor/jquery/dist/**'])
		.pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('js:lint', function() {
	return gulp.src("./src/assets/js/**/*.js")
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter());
});

gulp.task('js:bundle', function() {
	var bundler = browserify()
		.add('./src/assets/js/bm.js');

	return bundler.bundle({debug: true})
		.on('error', function (err) {
			console.log(err.toString());
			this.emit("end");
		})
		.pipe(exorcist('./dist/assets/js/bm.js.map'))
		.pipe(source("bm.js"))
		.pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('js', function(done) {
	runSequence('js:lint', 'js:bundle', done);
});

gulp.task('serve', function() {
	server.listen(serverport);
});

gulp.task('watch', function () {
	gulp.watch('src/assets/js/**', ['js']);
	gulp.watch(['./src/**/*', '!./src/assets/**', '!./src/vendor{,/**}'], ['html']);
	gulp.watch('./src/assets/scss/**/*.scss', ['styles']);	 
});

gulp.task('build', function(done) {
	runSequence('bower', ['styles', 'html', 'font', 'bootstrap:js', 'bootstrap:font', 'fontawesome:font', 'jquery:js', 'js'], done);
});

gulp.task('run', function(done) {
	runSequence('build', 'serve', 'watch', done);
});

gulp.task('default', ['build']);