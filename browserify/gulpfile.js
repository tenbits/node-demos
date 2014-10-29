var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
    gulp.src('src/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});