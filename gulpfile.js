var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});
gulp.task('lib', function(){
   gulp.src('./node_modules/bootstrap/**/*.*')
   .pipe(gulp.dest('./lib/bootstrap/'));
   gulp.src('./node_modules/font-awesome/**/*.*')
   .pipe(gulp.dest('./lib/font-awesome/'));
})
gulp.task('build', ['sass', 'lib'], function(){
   gulp.src('./*.html')
   .pipe(gulp.dest('./build/'));
   gulp.src('./lib/**/*.*')
   .pipe(gulp.dest('./build/lib/'));
   gulp.src('./css/**/*.css')
   .pipe(gulp.dest('./build/css/'));
   gulp.src('./src/index.js')
   .pipe(webpack(require('./webpack.config.js')))
   .pipe(gulp.dest('./build/'));
});
gulp.task('default', ['lib', 'sass'], function() {
    gulp.watch([
        'scss/*.scss'
    ], ['sass'])
});