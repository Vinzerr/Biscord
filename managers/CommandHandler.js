const UtilsManager = require('../classes/UtilsManager')
const ErrorHandler = require('../classes/ErrorHandler')
const Errors = require('../structures/Errors')
const Emitter = require('../classes/Emitter')
const ms = require('ms')

const { Collection } = require('discord.js')
const { readdirSync , lstatSync } = require('fs')
const path = require('path')

class CommandHandler extends Emitter {

  constructor ( path , settings ){

    super()

    this.path = path
    this.settings = settings ? null : {}
    this.client = Client
    this.ready = false
    this.utils = null

    this.Commands = new Collection()
    this.SlashCommands = new Collection()
    this.Cooldowns = new Map()

    this.init()

  }

  init(){

    this.utils = new UtilsManager()
    this.settings = this.utils.validateCommandHandlerSetttings( this.settings)

    if( ! this.client ) throw new ErrorHandler( Errors.noClient ) 
    if( ! this.path ) throw new ErrorHandler( 'The path for CommandHandler to use is required by default.' )
    if( typeof this.path != 'string' ) throw new ErrorHandler( `The path should be a string not a ${ typeof this.path }` )
    
    this.initialize()

  }

  initialize(){
    try {
      var stat
      var command
      var contents
      var slashcomms = []
      var base = readdirSync( path.join( require.main.filename , '..' , this.path ) )
      for ( const content of base ){
        stat = lstatSync( path.join( require.main.filename, '..' , this.path , content ) )
        if( stat.isFile()){
          command = require( path.join( require.main.filename, '..' , this.path , content ) )
          command = this.utils.validateCommand( command )
          command.data ? slashcomms.push( command.command , command ) : null
          this.Commands.set( command.command , command )
        } else {
          contents = readdirSync( path.join( require.main.filename, '..' , this.path , content ) )
          for ( const file of contents ){
            command = require( path.join( require.main.filename , '..' , this.path , content , file ) )
            command = this.utils.validateCommand( command )
            command.data ? slashcomms.push( command.data ) : null
            this.Commands.set( command.command , command )
          }
        }
      }
      this.ready = true
    } catch (error){
      throw new ErrorHandler( error )
    }

    var Commands = this.Commands
    var Cooldowns = this.Cooldowns
    var settings = this.settings

    this.client.on( 'messageCreate' , function ( message ){
      if( ! message.content.startsWith( settings.prefix )) return 
      var argums = message.content.slice(1).trim().split(/ +/)
      var name = argums.shift().toLowerCase()
      var command = Commands.find( element => element.command.toLowerCase() == name || element.aliases && element.aliases.some( alias => alias.toLowerCase() == name ))
      if( ! command ) return
      if( message.author.bot ) return
      if( command.guild && command.guild.length != 0 && ! message.guild ) return
      if( command.blockedRoles && command.blockedRoles.length != 0 && command.blockedRoles.some( role => message.member.roles.cache.some( r => r.id == role || r.name == role ))) return
      if( command.blockedUsers && command.blockedUsers.length != 0 && command.blockedUsers.some( user => user == message.author.id ) ) return 
      if( command.permisions && command.permisions.length != 0 && ! message.member.permissions.has(command.permissions)){
        if( command.users && command.users.length != 0 && ! command.users.some( user => user == message.author.id ) ){
          if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) { 
            return
          }
        } else if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) { 
          return 
        }
      }
      if( command.users && command.users.length != 0 && ! command.users.some( user => user == message.author.id )){
        if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ){
          return
        } else {
          return
        }
      }
      if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ){
         return
      }
      if( command.cooldown ){
        var current = Date.now()
        var cooldown = ms( command.cooldown )
        if( Cooldowns.has( `${message.author.id}.${command.command}` ) ){
          var expiring = Cooldowns.get( `${message.author.id}.${command.command}` ) + cooldown
          if( current < expiring ){
            var remaining = expiring - current
            return message.channel.send(`Command Cooldown: ${ ms(remaining) }`)
          }
        } else {
          Cooldowns.set( `${message.author.id}.${command.command}`, current )
          setTimeout( () => Cooldowns.delete( `${message.author.id}.${command.command}` ), cooldown )
        }
      }
      
      command.execute( message , argums )

    })
  }

  static get( query ){
    if( typeof Commands != 'object' ) throw new ErrorHandler( 'You need to execute new AutoBot.CommandHandler( params ) first to create a command handler!' )
    if( typeof query != 'string') throw new ErrorHandler( 'Query should be a string containing the name or an alias of the command.' )
    var command = Commands.find( element => element.command.toLowerCase() == query.toLowerCase() || element.aliases && element.aliases.some( alias => alias.toLowerCase() == query.toLowerCase() ))
    if( command ) return command
    else return false
  }

}

module.exports = CommandHandler