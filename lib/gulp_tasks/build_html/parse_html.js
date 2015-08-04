import htmlparser from 'htmlparser2'
import gutil from 'gulp-util'
import parse_node from './parse_node'
import parse_css from './parse_css'

export default function(file, callback, class_iterator){
  let final_css = ''
  let handler = new htmlparser.DomHandler((error, dom)=>{
    let top_level_class = `ms-${class_iterator}`
    let built = {
      html_css: '',
      ctrl_css: '',
      window_js: '',
      ctrl_js: '',
      views: [],
      final_css: ''
    }
    for(let i in dom){
      built = parse_node(dom[i], built, top_level_class)
    }

    let built_views = built.views[0]
    if(built.views.length > 1)
      built_views = `m('div',[${built.views.join(',\n')}])`

    final_css += parse_css(built.ctrl_css, top_level_class)
    final_css += built.html_css

    this.push(new gutil.File({
      path: file.relative,
      contents:new Buffer(`
  ${built.window_js}
  module.exports["${file.relative.replace(/\..*$/,'')}"] = {
  is_body(){
  return ${!!(built.views[0].match(/^m\('body'/))}
  },
  controller(args){
  ${built.ctrl_js}
  },
  view(ctrl, args){
  return ${built_views}
  }
  }
  `)      }))
    callback()
  })
  let parser = new htmlparser.Parser(handler)
  parser.write(file.contents)
  parser.done()
  return final_css
}