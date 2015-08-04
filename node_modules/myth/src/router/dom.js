import socket from '../socket/client'
import select_view from './select_view'
import console_client from '../console/client'
import m from '../m/m'

let console_view = console_client(socket)

document.addEventListener( "DOMContentLoaded", () => {

  // Preserve style
  let s = Array.prototype.slice.call(document.getElementsByTagName('style'))
    .map((i)=>i.innerHTML).join('\n')

  m.mount(document, {
    controller(){},
    view(ctrl){
      return m('html',{

        // Use m.route for href clicks by default
        onclick(e){
          let $t = e.target
          for(let i in $t.attributes){
            if($t.attributes[i].name === 'href'){
              m.route(e)
            }
          }
        }

      },[
        m('head',m('style',s)),

        // User controlled view
        select_view,

        // The console
        console_view

      ])
    }
  })
})