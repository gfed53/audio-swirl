let gulp = require('gulp');

let jshint = require('gulp-jshint');
let uglify = require('gulp-uglify');
let ngmin = require('gulp-ngmin');
let ngAnnotate = require('gulp-ng-annotate');
let minifyHtml = require('gulp-minify-html');
let minifyCss = require('gulp-minify-css');
let cleanCSS = require('gulp-clean-css');
let imagemin = require("gulp-imagemin");
let usemin = require('gulp-usemin');
let del = require('del');

let paths = {
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
		js: [ ngAnnotate(), uglify() ]
	}))
	.pipe(gulp.dest( paths.dist ))
});

gulp.task('build', ['usemin']);

//Default
gulp.task('default', ['jshint', 'sass', 'watch']);







