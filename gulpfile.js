var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html",
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch(["*.html", "js/**/*.js"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(replace(/\+\+/g, '@include '))
        .pipe(sass().on('error', function(err){
             // this.util.log(err.message);
             //gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));
            //gutil.beep();

             browserSync.notify("Error <span style='background:red'>"+err.message+"</span>", 99999999);
            console.log(err.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
        //.pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('default', ['serve']);