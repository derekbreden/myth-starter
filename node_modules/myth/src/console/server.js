import Convert from '../../node_modules/myth/node_modules/ansi-to-html'
let convert = new Convert()
let types = ['error','log','info','warn']
let last_10_console = []

export default function(server){

  // Capture sockets from server
  let sockets = {}
  server.on('connection', (socket) => {
    for(let i in last_10_console)
      socket.send(last_10_console[i])
    sockets[socket.id] = socket
    socket.on('close',()=>{
      delete sockets[socket.id]
    })
  })

  // Pass messages through those sockets
  let process_msg = (msg)=>{
    if(msg.action)
      for(let i in sockets)
        sockets[i].send(JSON.stringify(msg))
    if(msg.console){
      let str = (typeof msg.console === 'string')
        ?convert.toHtml(msg.console)
        :JSON.stringify(msg.console)
      let final_str = JSON.stringify({"console":str})
      for(let i in sockets)
        sockets[i].send(final_str)
      last_10_console.push(final_str)
      if(last_10_console.length>10) last_10_console.unshift()
    }
  }

  // Capture messages from gulp
  process.on('message', process_msg)

  // Capture console messages from self
  for(let i in types){
    let original = console[types[i]]
    console[types[i]] = (data) => {
      original(data)
      process_msg({"console":data})
    }  
  }
}