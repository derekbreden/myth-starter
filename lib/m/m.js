let m = require('mithril')
m.prop = require('./model')(m)
m.route = require('./route')(m)
m.remember = require('./remember')(m)
export default m