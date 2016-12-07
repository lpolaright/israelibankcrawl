var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var rollup = require('gulp-rollup');
var rollupIncludePaths = require('rollup-plugin-includepaths');

gulp.task('start', ['nodemon', 'sass:watch', 'bundle:watch']);

gulp.task('nodemon', function () {
  nodemon({
    script: './bin/www'
    , ext: 'js html jade'
    , env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

var includePathOptions = {
  paths: ['public/scripts/']
}

gulp.task('bundle:watch', function () {
  gulp.watch('./public/scripts/**/*.js', ['bundle']);
});

gulp.task('bundle', function () {
  return gulp.src("./public/scripts/**/*.js")
    .pipe(rollup({
      plugins: [{
        resolveId: function (code, id) {
          if (id)
            return (__dirname + ("/public/scripts/" + code + ".js").replace(/\//g,"\\"));
        }
      }],
      entry: [
        './public/scripts/financial_state/financialStateBootstrap.js',
        './public/scripts/configuration/configBootstrap.js'
      ]
    }))
    .on('error', console.log)
    .pipe(babel())
    .pipe(gulp.dest("./public/dist"));
});

gulp.task("babel", function () {
  return gulp.src("./public/scripts/**/*Bootstrap.js")
    .pipe(babel())
    .pipe(gulp.dest("./public/dist"));
});