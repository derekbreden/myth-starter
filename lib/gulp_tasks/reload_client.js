import gulp from 'gulp'
import server from 'gulp-develop-server'
gulp.task("reload_client", (cb) => {
  if(server.child)
    server.child.send({"action":"reload-client"})
  cb()
})