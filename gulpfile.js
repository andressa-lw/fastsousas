        
const {
  src,
  dest,
  parallel,
  series,
  watch,
} = require('gulp');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

function clear() {
  return src('./assets/*', {
    read: false
  }).pipe(clean());
}

function js() {
  const source = './src/js/*.js';
  const plugins = './src/lib/**/*.js';

  return src([plugins, source])
    .pipe(changed(source))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest('./assets/js/'))
    .pipe(browsersync.stream());
}

function css() {
  const source = './src/scss/main.scss';
  const plugins = './src/lib/**/*.css';

  return src([source, plugins])
    .pipe(changed(source))
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(cssnano())
    .pipe(dest('./assets/css/'))
    .pipe(browsersync.stream());
}

function img() {
  return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./assets/img'));
}

function watchFiles() {
  watch('./src/scss/*', css);
  watch('./src/js/*', js);
  watch('./src/img/*', img);
  watch(['*.html']).on('change', browsersync.reload);
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  });
}

exports.default = series(clear, parallel(js, css, img), parallel(watchFiles, browserSync));  