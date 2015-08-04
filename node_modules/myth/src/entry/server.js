import engine from '../../node_modules/myth/node_modules/engine.io'
import http_server from '../router/server'

let server = engine.attach(http_server)

import console_server from '../console/server'
console_server(server)

http_server.listen('3000')
console.log('http://127.0.0.1:3000/')