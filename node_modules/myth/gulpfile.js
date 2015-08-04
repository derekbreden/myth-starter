
var gulp = require('gulp')
var babel = require('gulp-babel')
var del = require('del')

gulp.task("clean", function(cb){
  return del(['./build'], cb)
})

gulp.task("default", ["clean"], function(){
  return gulp.src(["./src/gulp_tasks/**/*.js"])
    .pipe(babel())
    .on('error', function(err){
      console.error(err.fileName)
      console.error(err.loc)
      console.error(err.codeFrame)
    })
    .pipe(gulp.dest("./build"))
})