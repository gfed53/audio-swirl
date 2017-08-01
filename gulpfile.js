var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var strip = require('gulp-strip-comments');
var ngmin = require('gulp-ngmin');
var ngAnnotate = require('gulp-ng-annotate');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var imagemin = require("gulp-imagemin");
var usemin = require('gulp-usemin');
var del = require('del');
var runSequence = require('run-sequence');

var paths = {
	scripts: './src/**/*.js',
	styles: './src/styles',
	dependencies: './src/dependencies/*',
	html: [
	'./src/**/*.html',
	'!./src/index.html'
	],
	images: './src/images/*',
	index: './src/index.html',
	dist: './dist/'
};

// JavaScript linting
gulp.task('jshint', function(){
	return gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Watch
gulp.task('watch', function(){
	gulp.watch(paths.scripts, ['jshint']);
});

// Build
gulp.task('clean', function(){
	return del(paths.dist);
});

gulp.task('copy-html', function() {
	return gulp.src(paths.html)
			.pipe(gulp.dest('dist/'));
});

gulp.task('copy-dep', function() {
	return gulp.src(paths.dependencies)
			.pipe(gulp.dest('dist/dependencies'));
});

// Image optimization task (Bug with more recent versions?: task doesn't minify any images, so using gulp-imagemin version 2.4.0)
gulp.task('images', function() {
  	return gulp.src(paths.images)
		    .pipe(imagemin())
		    .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function(){
	return gulp.src( paths.index )
			.pipe(usemin({
				css: [ cleanCSS() ],
				js: [ strip(), babel({presets: ['es2015']}), ngmin(), uglify() ]
			}))
			.pipe(gulp.dest(paths.dist));
});

gulp.task('build', function(){
	runSequence(
		'clean',
		'copy-html',
		'copy-dep',
		'images',
		'usemin'
		);
});

//Default
gulp.task('default', ['jshint', 'watch']);







