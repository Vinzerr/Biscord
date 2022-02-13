const { EventEmitter } = require('events')

const Event = new EventEmitter()

class Emitter {

  constructor () { }

  on( event , callback ){
    Event.on( event , callback )
    return this
  }

  once( event , callaback ){
    Event.once( event , callback )
    return this
  }

  emit( event , ...args ){
    return Event.emit( event , ...args )
  }
}

module.exports = Emitter