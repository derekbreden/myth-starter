import server from 'gulp-develop-server'
let types = ['error','log','info','warn']  
// Intercept console messages from self
// Pass messages to server.child if exists
for(let i in types){
  let original = console[types[i]]
  console[types[i]] = function(data) {
    original.apply(console, arguments)
    let args = [].slice.call(arguments)
    if(server.child){
      try{server.child.send({"console":args.join(" ")})}catch(e){}
    }
  }
}