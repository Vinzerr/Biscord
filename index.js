var CommandHandler = require('./managers/CommandHandler')
var EventHandler = require('./managers/EventHandler')
var ErrorHandler = require('./classes/ErrorHandler')
var Errors = require ('./structures/Errors')
var Emitter = require('./classes/Emitter')
var Discord = require('discord.js')

var { Intents }  = require('discord.js')

var options = { intents : [ Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ]}

class Biscord extends Emitter {
  constructor( configuration ){
    super()

    console.log( `\u001b[33m[ Biscord ] Starting Module` )

    this.options = options
    this.configuration = configuration
    this.client = new Discord.Client( this.options )

    global.client = this.client
    global.ctoken = this.configuration.token
    global.clientid =  this.configuration.clientId

    if( ! this.configuration ) throw new ErrorHandler( Errors.missingConfig )
    if( ! this.configuration.token ) throw new ErrorHandler( Errors.noToken )
    if( ! this.configuration.clientId ) throw new ErrorHandler( Errors.invalidClientId )
    
  }

  configure( ClientOptions ){
    if( ! ClientOptions ) return this.options = options
    if( Object.keys(ClientOptions).length == 0 ) return this.options = options
    this.client = new Discord.Client( ClientOptions )
    this.options = ClientOptions
    client = this.client
    return this.client
  }

  initialize(){
    console.log( `\u001b[33m[ Biscord ] Starting Client` )
    try {
      this.client.on( 'ready' , function (){ console.log(`\u001b[34m               BISCORD beta.\nThank you for using Biscord as your framework, your Client is now online and can be used.`) })
      this.client.login( this.configuration.token )
      console.log( `\u001b[32m[ Biscord ] Client Online` )
    } catch (error) {
      throw new ErrorHandler( error )
    }
    return this.client
  }

  destroy(){
    this.client = null
    this.options = null
  }

  get CommandHandler(){
    return CommandHandler
  }

  get EventHandler(){
    return EventHandler
  }
}

module.exports = Biscord