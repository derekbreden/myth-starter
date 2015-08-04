import gulp from 'gulp'
import run_sequence from 'run-sequence'

gulp.task("default", (cb) => {
  run_sequence(
    "clean",
    "build_client",
    "build_app",
    "reload_client",
    "watch",
    cb
  )
})