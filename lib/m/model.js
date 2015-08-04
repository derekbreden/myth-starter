export default function(m){
  let just_set_or_modelize_a_few = (s,new_s) => {
    for(let i in new_s){
      if(typeof s === "function")
        s[i](new_s[i])
      else 
        s[i] = model(new_s[i])
    }
    return s
  }
  let set_or_modelize = (s,new_s) => {
    if(typeof s === "function")
      s(new_s)
    else 
      s = model(new_s)()
    return s
  }
  //
  // Model Creator
  let model = (s) => {
    // s is state
    //
    // make each item within a model as well
    if(typeof s === "object")
      for(let i in s)
        s[i] = model(s[i])
    //
    // Main function for getting and setting
    let get_set = (new_s) => {
      if (new_s !== undefined){
        m.startComputation()
        if(
          typeof new_s === "object"
          && typeof s === "object"
        )
          s = just_set_or_modelize_a_few(s,new_s)
        else
          s = set_or_modelize(s,new_s)
        m.endComputation()
        get_set.emit('change')
      }
      return s
    }
    //
    // Model raw data accessors
    get_set.toJSON = () => s
    get_set.readOnly = () => JSON.parse(JSON.stringify(s))
    //
    // Array methods which modelize new items
    let ks = ['push','unshift']
    for(let i in ks)
      get_set[ks[i]] = (new_s) => {
        m.startComputation()
        s[ks[i]](model(new_s))
        m.endComputation()
        get_set.emit('change')
      }
    //
    // Events
    let listeners = {}
    get_set.on = (eventName, fun) => {
      listeners[eventName] = listeners[eventName] || []
      listeners[eventName].push(fun)
    }
    get_set.off = (eventName, fun) => {
      for(let i in listeners[eventName]){
        if(fun === listeners[eventName][i])
          delete listeners[eventName][i]
      }
    }
    get_set.emit = (eventName, data) => {
      if(listeners[eventName])
        for(let i in listeners[eventName]){
          listeners[eventName][i](data)
        }
    }
    //
    return get_set
  }
  //
  //
  // Tests
  // let l = model([0,1])
  // console.warn(JSON.stringify(l))
  // l()[0](2)
  // console.warn(JSON.stringify(l))
  // l.unshift(3)
  // console.warn(JSON.stringify(l))
  // l()[0](4)
  // console.warn(JSON.stringify(l))
  // //
  // let m = model({a:'1'})
  // console.warn(JSON.stringify(m))
  // m({a:[0,1]})
  // console.warn(JSON.stringify(m))
  // m().a({"0":[{b:3,c:2}]})
  // console.warn(JSON.stringify(m))
  // m().a()[0]()[0]({b:4})
  // console.warn(JSON.stringify(m))
  //
  return model
}