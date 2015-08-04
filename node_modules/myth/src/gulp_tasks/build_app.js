import server from 'gulp-develop-server'
import gulp from 'gulp'
import babel from 'gulp-babel'

gulp.task("build_app", (cb) => {
  gulp.src(["./node_modules/myth/src/**/server.js"])
    .pipe(babel())
    .on('error', (err) => {
      console.error(err.fileName)
      console.error(err.loc)
      console.error(err.codeFrame)
      server.kill()
    })
    .pipe(gulp.dest("./build"))
    .on('end', () => {
      let server_ready = () => {
        if(cb)cb()
      }
      if(!server.child)
        server.listen({ path: './build/entry/server.js' }, server_ready)
      else
        server.restart(server_ready)
    })
})