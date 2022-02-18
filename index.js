var CommandHandler = require('./managers/CommandHandler')
var EventHandler = require('./managers/EventHandler')
var ErrorHandler = require('./classes/ErrorHandler')
var Errors = require ('./structures/Errors')
var Emitter = require('./classes/Emitter')
var Discord = require('discord.js')

var { Intents }  = require('discord.js')

var options = { intents : [ Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ]}

class Biscord extends Emitter {
  constructor(){
    super()

    this.options = options
    this.client = new Discord.Client( this.options )

    global.client = this.client
    
  }

  configure( ClientOptions ){
    if( ! ClientOptions ) return this.options = options
    if( Object.keys(ClientOptions).length == 0 ) return this.options = options
    this.client = new Discord.Client( ClientOptions )
    this.options = ClientOptions
    client = this.client
    return this.client
  }

  initialize( token ){
    try {
      this.client.on( 'ready' , function (){ console.log(`               BISCORD beta.\nThank you for using Biscord as your framework, your Client is now online and can be used.`) })
      this.client.login( token )
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

const biscord = new Biscord()
const eventhandler = new EventHandler( './events' )

biscord.initialize( process.env.token )
