const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const path = require('path');
const glob = require('glob');

function compileSCSS() {
  const scssFiles = glob.sync('./**/*.scss', { ignore: './node_modules/**' });

  return gulp.src(scssFiles, { base: './' })
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename((filePath) => {
      filePath.extname = '.css'; // Apenas altera a extensão para .css
    }))
    .pipe(gulp.dest('./'));
}

function watchFiles() {
  gulp.watch('./**/*.scss', { ignored: './node_modules/**' }, compileSCSS);
}

exports.default = gulp.series(compileSCSS, watchFiles);