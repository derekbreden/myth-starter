import gulp from 'gulp'
import run_sequence from 'run-sequence'

gulp.task("build_client", (cb) => {
  run_sequence("build_html","build_css","build_js", cb)
})