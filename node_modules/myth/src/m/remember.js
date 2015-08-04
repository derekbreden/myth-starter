let isMobile = (('ontouchstart' in window)
  || (navigator.MaxTouchPoints > 0)
  || (navigator.msMaxTouchPoints > 0))
  
export default function(m){  
  let state = m.prop({})
  return (uid) => {
    return (el, init_already) => {
      if(!init_already){
        if(!state()[uid]){ 
          let to_set = {}
          to_set[uid] = {value: '', selectionStart: 0, selectionEnd: 0}
          state(to_set)
        }
        var track = function(e){
          state()[uid]({
            value: e.target.value,
            selectionStart: e.target.selectionStart,
            selectionEnd: e.target.selectionEnd
          })
        }
        el.value = state()[uid]().value()
        el.addEventListener('keyup',track)
        if(!isMobile){
          el.addEventListener('mousedown',function(e){
            var windowEvent = function(){
              track(e)
              window.removeEventListener('mouseup',windowEvent)
            }
            window.addEventListener('mouseup',windowEvent)
          })
          el.selectionStart = state()[uid]().selectionStart()
          el.selectionEnd = state()[uid]().selectionEnd()
          el.focus()
        }
      }
    }  
  }  
}