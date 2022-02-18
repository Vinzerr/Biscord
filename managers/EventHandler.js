const UtilsManager = require('../classes/UtilsManager')
const ErrorHandler = require('../classes/ErrorHandler')
const Emitter = require('../classes/Emitter')
const Errors = require('../structures/Errors')

const { Collection } = require('discord.js')
const { readdirSync , lstatSync } = require('fs')
const path = require('path')

class EventHandler extends Emitter {

  constructor ( path , settings ){

    super()

    this.path = path
    this.settings = settings ? null : { }
    this.client = client
    this.ready = false
    this.utils = new UtilsManager()
    this.events = new Collection()

    if( ! this.path ) throw new ErrorHandler( 'The path for EventHandler to use is required by default.' )
    if( typeof this.path != 'string' ) throw new ErrorHandler( `The path should be a string not a ${ typeof this.path }` )

    this.initialize()

  }

  initialize(){
    var base = readdirSync( path.join( require.main.path , this.path ) )
    var stat
    var event 
    var contents

    for ( let content of base ){
      stat = lstatSync( path.join( require.main.path, this.path , content ) )
      if( stat.isFile()){
          content = require( path.join( require.main.path, this.path , content ) )
          content = this.utils.validateEvent( content )
          this.client.on( content.event , ( ...args ) => {
            console.log()
            content.Execute(...args)
          })
          this.events.set( content.event , content )
        } else {
          contents = readdirSync( path.join( require.main.path, this.path , content ) )
        for ( let event of contents ){
          event = require( path.join( require.main.path , this.path , content , event ) )
          event = this.utils.validateEvent( event )
          this.client.on( event.event , ( ...args ) => {
            event.Execute(...args)
          })
          this.events.set( event.event , event )
        }
      }
    }
  }

  get( query ){
    if( typeof query != 'string') throw new ErrorHandler( 'Query should be a string containing the name of the event.' )
    event = this.events.find( element => element.event.toLowerCase() == query.toLowerCase() )
    if( event ) return event
    else return false
  }
}

module.exports = EventHandler