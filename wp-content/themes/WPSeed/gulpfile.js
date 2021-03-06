/*
 * GULP CONFIG
 *
 * Desciption:  Clean gulpfile for web development workflow containing
 *              - compiling/optimization of sass, javascript and images from assets to dist and vendors
 *              - browsersync
 *              - cache-busting
 *              - modernizr
 *              - vendor handling through glulp-vendors.json
 *
 * Usage:       - `gulp` (to run the whole process)
 *              - `gulp watch` (to watch for changes and compile if anything is being modified)
 *              - `modernizr -c assets/scripts/modernizr-config.json -d assets/scripts` to generate the modernizr.js file from the config-file
 *              - add vendor-requirements to gulp-vendors.json, they will be compiled/bundled by `gulp` (restart `gulp watch`)
 *
 * Author:      Flurin Dürst (https://flurinduerst.ch)
 *
 * Version:     2.3.1
 *
*/


/* SETTINGS
/===================================================== */
// local domain used by browsersync
var browsersync_proxy = "http://localhost:8888/chris-portfolio";

// default asset paths
var assets = {
  css: ['assets/styles/bundle.scss'],
  css_watch: ['assets/styles/*.scss'],
  javascript: ['assets/scripts/*.js'],
  images: ['assets/images/*.*'],
  fonts: ['assets/fonts/*.*']
}

// vendors are loaded from gulp-vendors.json
var vendors = require('./gulp-vendors.json');


/* DEPENDENCIES
/===================================================== */
// general
var gulp = require('gulp');
// var webpack = require('webpack-stream');
var babel = require('gulp-babel');

var rjs = require('gulp-requirejs');

// var webpack = require('webpack');
// var webpackStream = require('webpack-stream');
// var webpackConfig = require('webpack.config.js');


var concat = require('gulp-concat');
var rename = require("gulp-rename");
var order = require("gulp-order");
var browserSync = require('browser-sync').create();
// css
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
// cache busting
var rev = require('gulp-rev');
// js
var uglify = require('gulp-uglify');
// images
var imagemin = require('gulp-imagemin');
// error handling with notify & plumber
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
// watch
var watch = require('gulp-watch');
// delete
var del = require('del');
var jshint = require('gulp-jshint');


/* TASKS
/===================================================== */

/* CLEAN
/––––––––––––––––––––––––*/
// delete compiled files/folders (before running the build)
// css
gulp.task('clean:css', function() { return del(['dist/*.css', 'dist/rev-manifest.json'])});
gulp.task('clean:cachebust', function() { return del(['dist/style-*.min.css'])});
gulp.task('clean:javascript', function() { return del(['dist/*.js'])});
gulp.task('clean:images', function() { return del(['dist/images'])});
gulp.task('clean:fonts', function() { return del(['dist/fonts'])});

/* BROWSERSYNC
/––––––––––––––––––––––––*/
// initialize Browser Sync
gulp.task('browsersync', function() {
  browserSync.init({
   proxy: browsersync_proxy,
    // server: "localhost",
    // port: 8888,
    notify: false,
    open: false,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
});


/* CSS
/––––––––––––––––––––––––*/
// from:    assets/styles/main.css
// actions: compile, minify, prefix, rename
// to:      dist/style.min.css
gulp.task('css', ['clean:css'], function() {
  return gulp.src(assets['css'].concat(vendors['css']))
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(concat('style.min.css'))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', { cascade: false }))
    .pipe(cleanCSS())
    .pipe(rename('dist/style.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});


/* CSS CACHE BUSTING
/––––––––––––––––––––––––*/
// from:    dist/style.min.css
// actions: create busted version of file
// to:      dist/style-[hash].min.css
gulp.task('cachebust', ['clean:cachebust', 'css'], function() {
  return gulp.src('dist/style.min.css')
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({merge: true}))
    .pipe(gulp.dest('dist'))
});


/* JAVASCRIPT
/––––––––––––––––––––––––*/
// from:    assets/scripts/
// actions: concatinate, minify, rename
// to:      dist/script.min.css
// note:    modernizr.js is concatinated first in .pipe(order)
gulp.task('javascript', ['clean:javascript'], function() {
  //assets/scripts/*.js/
  return gulp.src(assets['javascript'].concat(vendors['javascript']))
    // .pipe(webpack())
    .pipe(order([
      'node_modules/babel-polyfill/dist/polyfill.js',
      'assets/scripts/modernizr.js',
      'assets/scripts/JDLoader.min.js',
      'assets/scripts/OrbitControls.js',
      "node_modules/barba.js/dist/barba.js",
      "node_modules/simplebar/dist/simplebar.min.js",
      // 'assets/scripts/home.js',
      // 'assets/scripts/functions.js',
      'assets/scripts/*.js'
    ], { base: './' }))
    //.pipe(babel({presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)}))
    //.pipe(webpackStream(webpackConfig), webpack)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(rename('dist/script.min.js'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});


/* IMAGES
/––––––––––––––––––––––––*/
// from:    assets/images/
// actions: minify
// to:      dist/images
gulp.task('images', ['clean:images'],  function() {
  return gulp.src(assets['images'].concat(vendors['images']))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    // .pipe(browserSync.stream()); // currently bugged (18.12.2017)
});

/* FONTS
/––––––––––––––––––––––––*/
// from:    assets/fonts/
// actions: move (no processing at all, just keeping stuff in place)
// to:      dist/fonts/
gulp.task('fonts', ['clean:fonts'],  function() {
  return gulp.src(assets['fonts'])
  .pipe(gulp.dest('dist/fonts'))
});


/* WATCH
/––––––––––––––––––––––––*/
// watch for modifications in
// styles, scripts, images, php files, html files
gulp.task('watch',  ['browsersync'], function() {
  gulp.watch(assets['css_watch'], ['css', 'cachebust']);
  gulp.watch(assets['javascript'], ['javascript']);
  gulp.watch(assets['images'], ['images']);
  gulp.watch(assets['fonts'], ['fonts']);
  gulp.watch('*.php', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});


/* DEFAULT
/––––––––––––––––––––––––*/
// default gulp tasks executed with `gulp`
gulp.task('default', ['css', 'cachebust', 'javascript', 'images', 'fonts']);
