import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import del from 'del'
import source from 'vinyl-source-stream'

gulp.task("build_js",(cb)=>{
  browserify({
    entries: ['./node_modules/myth/src/entry/client.js']
  })
  .transform(babelify)
  .bundle()
  .on('error', (err) => {
    console.error(err.filename)
    console.error(err.loc)
    console.error(err.codeFrame)
  })
  .pipe(source('entry/client.js'))
  .pipe(gulp.dest("./build"))
  .on('end', () => {
    del(['./build/tmp_modules.js'],()=>{})
    if(cb)cb()
  })
})
