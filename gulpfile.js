const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
   gulp.src('./src/stylesheets/main.less')
       .pipe(less())
       .pipe(autoprefixer({
           browsers: ['last 5 versions']
       }))
       .pipe(cleanCSS({compatibility: 'ie10'}))
       .pipe(gulp.dest('./build/css'))
       .pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'css'], function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/stylesheets/**/*.less', ['css']);
});

gulp.task('default', ['watch']);