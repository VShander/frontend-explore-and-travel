const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');

function defaultTask(cb) {

    gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({
            basename: "style",
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
    cb();
}

function browserS(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

function watchScss() {
    gulp.watch('./scss/**/*', defaultTask);
}

function watchFiles() {
    gulp.watch('./**/*.html', browserReload);
    gulp.watch('./**/*.php', browserReload);
    gulp.watch('./**/*.js', browserReload);
}

// Compress Task

function compressImg(done) {
    gulp.src('unc-img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('img'))
    done();
}

gulp.task('default', gulp.parallel(watchScss));

gulp.task('compress', gulp.parallel(compressImg));



// gulp.task('default', gulp.parallel(browserS, watchScss, watchFiles));

// exports.default = defaultTask;