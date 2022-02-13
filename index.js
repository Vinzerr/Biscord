var CommandHandler = require('./managers/CommandHandler')
var EventHandler = require('./managers/EventHandler')
var ErrorHandler = require('./classes/ErrorHandler')
var Errors = require ('./structures/Errors')
var Emitter = require('./classes/Emitter')
var Discord = require('discord.js')

var { Intents }  = require('discord.js')

class Biscord extends Emitter {

  constructor ( token , clientid , clientsettings ){
    super()
    this.clientsettings = clientsettings
    this.token = token
    this.clientid = clientid
    this.ready = null
    this.crashed = null
    this.client = null
  
    this.init()
  }

  init(){

    if( ! this.token ) throw new ErrorHandler( Errors.invalidToken )
    if( ! this.clientid ) throw new ErrorHandler( Errors.invalidClientId )
    if( ! this.clientsettings || this.clientsettings == { } ) this.clientsettings = { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]}

    this.client = new Discord.Client( this.clientsettings )
    this.client.on( 'ready' , function(){
      console.log(`            >>><< AutoBot >><<<            \nThank you for using AutoBot as your framework! Your bot is now ready to be used ( online ).`)
    })

    global.Client = this.client

  }

  initialize(){
    var token = this.token
    var client = this.client
    return new Promise ( async function ( resolve , reject ){
      try {
        client.login( token )
        Client = client
        resolve( client )
      } catch ( error ){
        throw new ErrorHandler( error )
        reject( error )
      }
    })
  }

  destroy(){
    this.token = null
    this.clientid = null
    this.ready = null
    this.crashed = null
    this.client = null
    this.emit( 'destroy' )
    return this
  }

  get CommandHandler(){
    return CommandHandler
  }

  get EventHandler(){
    return EventHandler
  }

}