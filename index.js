var CommandHandler = require('./managers/CommandHandler')
var UtilsManager = require('./classes/UtilsManager')
var EventHandler = require('./managers/EventHandler')
var ErrorHandler = require('./classes/ErrorHandler')
var Errors = require ('./structures/Errors')
var Emitter = require('./classes/Emitter')
var Discord = require('discord.js')

var Package = require('./package.json')
var { Intents } = require('discord.js')

class Biscord extends Emitter {

  constructor (){
    super()
    this.options = { intents: [ Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ] }
    this.token = null
    this.client = new Discord.Client( this.options )
    this.client.on( 'ready' , async () => { console.log(`               >>><< AutoBot >><<<\n\n[ Current Version ] ${ Package.version }\n[ Thank You! ] Thank you for using AutoBot as your framework! Your bot is now ready to be used ( online ).`) })
    global.client = this.client
  }

  destroy(){
    this.token = null
    this.client = null
    this.options = null
  }

  configure( options ){
    if( options == undefined ) return
    if( Object.keys(options).length == 0 ) return
    if( typeof options != 'object' ) throw new ErrorHandler( Errors.invalidOptions )
    try { 
      this.client = new Discord.Client( options )
      this.client.on( 'ready' , async () => { console.log(`               >>><< AutoBot >><<<\n\n[ Current Version ] ${ Package.version }\n[ Thank You! ] Thank you for using AutoBot as your framework! Your bot is now ready to be used ( online ).`) })
      this.options = options
    } catch (error){
      throw new ErrorHandler( error ) 
    }
    return this.client
  }

  initialize ( token ){
    this.token = token
    if( this.token == undefined) throw new ErrorHandler( Errors.noToken )
    if( typeof this.token != 'string' ) throw new ErrorHandler( Errors.invalidToken )
    this.client.login( this.token )
    
    client = this.client
    return this.client
  }

  get CommandHandler(){
    return CommandHandler
  }

  get EventHandler(){
    return EventHandler
  }

}

var biscord = new Biscord()
var Client = biscord.initialize( process.env.token )

Client.on('ready', () => {
  console.log('baboy')
})