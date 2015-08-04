import gulp from 'gulp'
import through2 from 'through2'
import concat from 'gulp-concat'
import gutil from 'gulp-util'
import parse_html from './parse_html'

gulp.task("build_html", ()=>{
  
  let class_iterator = 0
  let built_css = ''
  return gulp
    .src("./src/**/*.html")
    .pipe(through2.obj(function(file, enc, callback){
      built_css += parse_html.bind(this)(file, callback, class_iterator++)
    }))
    .pipe(concat('tmp_modules.js'))
    .pipe(through2.obj(function(file, enc, callback){
      this.push(new gutil.File({
        path: 'tmp_modules.css',
        contents: new Buffer(built_css)
      }))
      this.push(file)
      callback()
    }))
    .pipe(gulp.dest("./build"))
})