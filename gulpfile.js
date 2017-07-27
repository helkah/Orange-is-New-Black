var gulp = require('gulp'); 
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function() { 
    return gulp.src('sass/main.scss')
     .pipe(sourcemaps.init())    
     .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
    })) 
     .pipe(sourcemaps.write())
     .pipe(autoprefixer())
     .pipe(gulp.dest('css'))
});

gulp.task('watch', function(){ 
   gulp.watch('sass/**/*.scss', ['sass']);
});