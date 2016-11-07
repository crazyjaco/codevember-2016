var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
//    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass({trace: true, verbose: true}).on('error', sass.logError))
    //.pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['src/scripts/**/*.js', '!src/scripts/**/*.min.js'])
    .pipe(jshint.reporter('default'))
    //.pipe(concat('index.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('minScripts', function(){
    return gulp.src(['src/scripts/**/*.min.js',])
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('markup', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', function() {
    gulp.start('markup', 'images', 'styles', 'scripts', 'minScripts');
//    gulp.start('clean');
});

gulp.task('clean', ['scripts'], function() {
    return del(['scripts/main.js']);
});

gulp.task('watch', function() {
  gulp.watch(['src/images/**/*.*'], ['images'])
  gulp.watch(['src/**/*.html'], ['markup']);
  gulp.watch(['src/styles/**/*.scss', 'src/styles/modules/*.scss'], ['styles']);
  gulp.watch(['src/scripts/**/*.js', '!src/scripts/**/*.min.js', '!src/scripts/**/main.js'], ['scripts', 'minScripts', 'clean']);
});