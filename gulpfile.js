'use strict';
// [] was replaced by gulp seriesand 
//  Call the callback function link : https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async#:~:text=If%20you%20didn't%20explicitly,as%20your%20task%20function%20returns.
// hope so this link stays but

// Call the callback function
// This is probably the easiest way for your use case: gulp automatically passes a callback function to your task as its first argument. Just call that function when you're done:
                            //   |
                            //   V
// gulp.task('message', function(done) {
//   console.log("HTTP Server Started");
//   done();  <-- done apr tadded in copyfonts coz dont know it requires an assync function signal calll
// });
// erros was this:
//  d you forget to signal async completion?

// gulp.start removed from version 4 so used parallel instead of start and no function also required there
// eg for last line was like this for version before 4 now got to last line for after 4.0.0 
// 
// gulp.task('build', ['clean'], function() {
//     gulp.start('copyfonts','imagemin','usemin');
// });
// similarly used at line 67 for default task here is the old code goto 67 line for latest version code
// gulp.task('default', ['browser-sync'], function () {
//     gulp.start('sass:watch');
// });

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

    
gulp.task('sass',function () {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch',function () {
    gulp.watch('./css/*.scss',['sass']);
});

gulp.task('browser-sync',function () {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

//default task
gulp.task('default', gulp.series('browser-sync', gulp.parallel('sass:watch')));

//clean
gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function (done) {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
    done();
});

gulp.task('imagemin',function () {
    return gulp.src('./img/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin',function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream,file) {
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [function() { return htmlmin({collapseWhitespace: true})}],
            js: [ uglify(), rev() ],
            inlinejs: [ uglify() ],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin','usemin')));
