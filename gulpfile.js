"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin =require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var webp =require("gulp-webp");
var posthtml = require("gulp-posthtml");
var del = require("del");
var include = require("posthtml-include");
var pipeline = require("readable-stream").pipeline;

gulp.task("clean", function () {
  return del("build");
});

gulp.task("webp", function (){
  return gulp.src("source/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpeg,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task ("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
});

/*adds sprite to html*/
gulp.task("html", function(){
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});
/*
gulp.task("js", function () {
  return pipeline(
    gulp.src("source/js/script.js"),
    gulp.dest("build/js")
  );
});
*/
gulp.task('js', function () {
  return gulp.src("source/js/script.js")
    .pipe(gulp.dest("build/js"));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/js/*.js", gulp.series("js","refresh"));
  gulp.watch("source/less/**/*.less", gulp.series("css","refresh"));
  gulp.watch("source/img/sprite/*.svg", gulp.series("sprite","html","refresh"));
  gulp.watch("source/*.html", gulp.series("html","refresh"));
// watches if new images were added from source/img
  gulp.watch("source/img/**/*.{png,jpg,svg,webp}",gulp.series("copy","refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*.{png,jpg,jpeg,svg,webp,ico}",
    "source/js/*.js",
    "source/*.ico"
  ],{
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html",
  "js",
  "refresh"
));

gulp.task("start", gulp.series("build", "server"));
