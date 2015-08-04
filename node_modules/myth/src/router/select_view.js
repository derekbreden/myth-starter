let modules = require('../../../../build/tmp_modules')
import m from '../m/m'

export default {
  controller(){
    this.select_view = ()=>{
      let which = modules.index
      let path = window.location.pathname
      path = path.substr(1,path.length)
      
      // This will get fancier
      if(modules[path])
        which = modules[path]
      // module should also be able to specify more routes than its filename somehow

      return which.is_body()
        ?m.component(which)
        :m('body',m.component(which))
    }
  },
  view(ctrl){
    return ctrl.select_view()  
  }
}