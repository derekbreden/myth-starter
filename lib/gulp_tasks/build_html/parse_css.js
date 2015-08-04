import css from 'css'

export default function(in_css, top_level_class){
  let obj = css.parse(in_css)
  for(let i in obj.stylesheet.rules){
    let new_selectors = []
    for(let j in obj.stylesheet.rules[i].selectors){
      let this_selector = obj.stylesheet.rules[i].selectors[j]
      new_selectors.push(`.${top_level_class} ${this_selector}`)
      new_selectors.push(`${this_selector}.${top_level_class} `)
    }
    obj.stylesheet.rules[i].selectors = new_selectors
  }
  return css.stringify(obj)
}