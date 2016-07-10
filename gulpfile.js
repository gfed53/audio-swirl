var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var imagemin = require("gulp-imagemin");
var usemin = require('gulp-usemin');
var del = require('del');

var paths = {
	scripts: 'src/**/*.js',
	styles: './src/styles',
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
	del(paths.build);
});

gulp.task('copy', [ 'clean' ], function() {
	gulp.src( paths.html.concat(paths.images) )
	.pipe(gulp.dest('dist/'));
});

// Image optimization task
gulp.task("images", function() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task('usemin', [ 'copy', 'images' ], function(){
	gulp.src( paths.index )
	.pipe(usemin({
		css: [ cleanCSS() ],
		js: [ ngmin(), uglify() ]
	}))
	.pipe(gulp.dest( paths.dist ))
});

gulp.task('build', ['usemin']);

//Default
gulp.task('default', ['jshint', 'sass', 'watch']);







