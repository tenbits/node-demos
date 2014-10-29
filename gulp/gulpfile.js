var less = require('gulp-less');
var gulp = require('gulp');
var path = require('path');


gulp.task('less', function() {
  gulp.src('./less/*.less')
    .pipe(less({
    paths: [path.join(__dirname, 'less', 'includes')]
  }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
  gulp.watch('less/*.less', ['less']);
  
})