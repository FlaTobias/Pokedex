const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compilaSass() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

function gulpJs() {
  return gulp
    .src("./js/scripts/**/*.js")
    .pipe(concat("all.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./js/"))
    .pipe(browserSync.stream());
}

function pluginJs() {
  return gulp
    .src(["./js/lib/axios.min.js", "./js/lib/swiper.min.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("./js/"))
    .pipe(browserSync.stream());
}

function pluginsCss() {
  return gulp
    .src(["./css/lib/*.css"])
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());
}

function watchFunc() {
  gulp.watch("./scss/**/*.scss", compilaSass);
  gulp.watch("./css/lib/*.css", pluginsCss);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/scripts/*.js", gulpJs);
  gulp.watch("./js/lib/*.js", pluginJs);
}

exports.sass = compilaSass;
exports.browsersync = browsersync;
exports.gulpJs = gulpJs;
exports.pluginJs = pluginJs;
exports.pluginsCss = pluginsCss;
exports.watch = watchFunc;
exports.default = gulp.parallel(
  watchFunc,
  gulpJs,
  pluginJs,
  pluginsCss,
  compilaSass,
  browsersync
);
