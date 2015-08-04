let parse_node = (node, built, top_level_class) => {
  if(node.type === 'script'){
    if(node.attribs.window !== undefined)
      built.window_js += node.children[0].data
    else
      built.ctrl_js += node.children[0].data
  }else if(node.type === 'style'){
    if(node.attribs.html !== undefined)
      built.html_css += node.children[0].data
    else
      built.ctrl_css += node.children[0].data
  }else if(node.type === 'tag'){
    let children = {views:[]}
    for(let i in node.children){
      children = parse_node(node.children[i],children)
    }
    let attrs = []
    let found_class = false
    for(let i in node.attribs){
      if(top_level_class){
        if(i === 'class' || i === 'className'){
          if(typeof node.attribs[i] === 'string'){
            node.attribs[i] += ` + ' ${top_level_class}'`
          }
          found_class = true
        }
      }
      let attr_js = node.attribs[i].replace(/this\./g,'ctrl.')
      if(attr_js === "") attr_js = "true"
      attrs.push(`${i}:${attr_js}`)
    }
    if(top_level_class && !found_class){
      attrs.push(`class:'${top_level_class}'`)
    }
    built.views.push("m('"+node.name+"',{"+attrs.join(',')+"},["+children.views.join(",\n")+"])\n")
  }else if(node.type === 'text'){
    let d = node.data
    if(!d.replace(/(\n|\t)/g,' ').match(/^ *$/)){
      let js = d.replace(/this\./g,'ctrl.')
      if(built.needs_closing){
        built.needs_closing = false
        js=" ] "+js
      }
      if(js.match(/(return|=>|\?)[ \n]*$/)){
        js = js.replace(/(return|=>)[ \n]*$/, '$1 ')
        js+=" [ "
        built.needs_closing = true
      }
      built.views.push(js)
    }
  }
  return built
}

export default parse_node