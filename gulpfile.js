const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const gulpjsminify = require('gulp-minify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');

function styleMin () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./'))
}

function jsMinify () {
    return gulp.src('./src/js/**/main.js')
    .pipe(babel())
    .pipe(gulpjsminify())
    .pipe(gulp.dest('./dist/assets/js'))
}

function img () {
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'))
}

function watch () {
    gulp.watch('./src/scss/**/*.scss' , styleMin);
    gulp.watch('./src/img/*' , img);
    gulp.watch('./src/js/**/*.js' , jsMinify);
}

exports.styleMin = styleMin;
exports.jsMinify = jsMinify;
exports.img = img;
exports.watch = watch;