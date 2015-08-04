let types = ['error','log','info','warn']
import m from '../m/m'
  
export default function(socket){

  let logs = m.prop([])

  let console_view = m.component({
    controller(){
      this.tab = m.prop('Console')
    },
    view(ctrl){
      return m('console',
        m('console-header',[
          m('console-header-item',{class:ctrl.tab()==='Inspector'?'active':''},'Inspector'),
          m('console-header-item',{class:ctrl.tab()==='Editor'?'active':''},'Editor'),
          m('console-header-item',{class:ctrl.tab()==='Console'?'active':''},'Console')
        ]),
        m('console-inner',{
            config(el,initted){
              if(!initted){
                el.scrollTop = el.scrollHeight
                logs.on('change',()=>{
                  setTimeout(()=>{
                    el.scrollTop = el.scrollHeight
                  },100)
                })
              }
            }
          },
          logs().map((log)=>{
            return m('console-item',m.trust(
              log()
              .replace(/#00A/g,'#59F')
              .replace(/#A00/g,'#F55')
              .replace(/#A50/g,'#CC0')
            ))
          })
        )
      )
    }
  })

  for(let i in types){
    let original = console[types[i]]
    console[types[i]] = function(data){
      original.apply(console,arguments)
      logs.push('<s1>client:</s1> '+Array.prototype.slice.call(arguments).join(' '))
    }
  }

  socket.on('message', (msg) => {
    msg = JSON.parse(msg)
    if(msg && msg.action && msg.action === "reload-client")
      window.location.reload()
    if(msg && msg.console){
      logs.push('<s1>server:</s1> '+msg.console)
    }
  })
  
  return console_view
}