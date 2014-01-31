//
// npm install gulp-jshint gulp-concat gulp-uglify gulp-clean gulp-notify gulp-rename gulp-cache --save-dev
//

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify');

gulp.task('default', ['clean'], function() {
    gulp.start('prepare', 'minify');
});

gulp.task('prepare', function() {
  return gulp.src(['src/copyright.js', 'src/categorizr.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
		.pipe(concat("categorizr.js"))
    .pipe(gulp.dest('./'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    // .pipe(gulp.dest('dist/assets/js'))
    // .pipe(livereload(server))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('minify', ['prepare'], function() {
  return gulp.src('categorizr.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    // .pipe(gulp.dest('dist/assets/js'))
    // .pipe(livereload(server))
    .pipe(notify({ message: 'Minify task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['categorizr.js', 'categorizr.min.js'], {read: false})
    .pipe(clean());
});
