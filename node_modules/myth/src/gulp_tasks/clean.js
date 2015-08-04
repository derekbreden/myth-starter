import gulp from 'gulp'
import del from 'del'

gulp.task("clean", (cb) => {
  return del(['./build'], cb)
})