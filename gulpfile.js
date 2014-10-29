var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var less = require('gulp-less');
var hologram = require('gulp-hologram');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  gulp.watch('./src/less/*.less', function() {
    return gulp.run('less');
  });

  gulp.watch('./build/css/*.*', function() {
    return gulp.run('build');
  });
});

gulp.task('less', function() {
  return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('hologram', function() {
  return gulp.src('./hologram_config.yml')
    .pipe(hologram())
    .pipe(livereload());
});

gulp.task('clean', function() {
  var cleanSource = [ './docs' ];
  var streamOptions = { read: false };
  
  return gulp.src(cleanSource, streamOptions)
    .pipe(clean());
})

gulp.task('build', function(callback) {
  runSequence('clean', 'hologram', callback);
});
