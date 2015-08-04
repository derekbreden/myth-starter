import eio from 'engine.io-client'
let socket = new eio.Socket('ws://'+window.location.hostname+':'+window.location.port+'/')
socket.on('open', () => {
  if(!socket.opened){
    socket.opened = true
    socket.on('close', () => {
      socket.open()
    })
  }
})

export default socket