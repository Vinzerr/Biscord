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
    this.client = Client
    this.ready = false

    this.Events = new Collection()

    this.init()

  }

  init(){

    this.utils = new UtilsManager()

    if( ! this.client ) throw new ErrorHandler( Errors.noClient ) 
    if( ! this.path ) throw new ErrorHandler( 'The path for EventHandler to use is required by default.' )
    if( typeof this.path != 'string' ) throw new ErrorHandler( `The path should be a string not a ${ typeof this.path }` )

    this.initialize()

  }

  initialize(){
    try{

      var stat
      var contents
      var base = readdirSync( path.join( require.main.filename , '..' , this.path ) )

      for ( let content of base ){
        stat = lstatSync( path.join( require.main.filename, '..' , this.path , content ) )
        if( stat.isFile()){
          content = require( path.join( require.main.filename, '..' , this.path , content ) )
          content = this.utils.validateEvent( content )
          this.client.on( content.event , ( ...args ) => {
            content.execute(...args)
          })
          this.Events.set( content.event , content )
        } else {
          contents = readdirSync( path.join( require.main.filename, '..' , this.path , content ) )
          for ( let event of contents ){
            event = require( path.join( require.main.filename , '..' , this.path , content , event ) )
            event = this.utils.validateEvent( event )
            this.client.on( event.event , ( ...args ) => {
              event.execute(...args)
            })
            this.Events.set( event.event , event )
          }
        }
      }

      this.ready = true
      
    } catch (error){
      throw new ErrorHandler( error )
    }
  }

}

module.exports = EventHandler