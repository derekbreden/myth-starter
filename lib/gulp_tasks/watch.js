import gulp from 'gulp'
import run_sequence from 'run-sequence'

gulp.task("watch", (cb) => {
  gulp.watch([
    './lib/**/server.js'
  ], () => {
    run_sequence("build_app","reload_client")
  })
  gulp.watch([
    './lib/**/*.js',
    './lib/**/*.css',
    './src/**/*.html',
    '!./lib/**/server.js',
    '!./lib/gulp_tasks/*.js'
  ], () => {
    run_sequence("build_client","reload_client")
  })
  cb()
})
