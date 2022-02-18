var UtilsManager = require('../classes/UtilsManager')
var ErrorHandler = require('../classes/ErrorHandler')
var Errors = require('../structures/Errors')
var Emitter = require('../classes/Emitter')
var path = require('path')
var ms = require('ms')

var { REST } = require('@discordjs/rest')
var { Routes } = require('discord-api-types/v9')
var { Collection } = require('discord.js')
var { readdirSync , lstatSync } = require('fs')

class CommandHandler extends Emitter {
  constructor( path , CommandOptions ){
    super()

    this.utils = new UtilsManager()
    this.commands = new Collection()
    this.scommands = new Collection()
    this.cooldowns = new Collection()

    this.path = path
    this.scomms = []
    this.settings = this.utils.validateCommandHandlerSetttings( CommandOptions ? CommandOptions : { } )

    this.initialize()
  
  }

  initialize(){
    var base = readdirSync(path.join( require.main.path , this.path ))
    var stat
    var command
    var contents

    var commands = this.commands
    var settings = this.settings
    var cooldowns = this.cooldowns

    for( const content of base ){ 
      stat = lstatSync(path.join( require.main.path , this.path , content ))
      if( stat.isFile() ){
        command = require(path.join( require.main.path , this.path , content ))
        command = this.utils.validateCommand( command )
        this.commands.set( command.command , command )
        if( command.data ) this.scomms.push( command.data )
      } else {
        contents = readdirSync(path.join( require.main.path , this.path , content ))
        for( const file of contents ){
          command = require(path.join( require.main.path , this.path , content , file ))
          command = this.utils.validateCommand( command )
          this.commands.set( command.command , command )
          if( command.data ) this.scomms.push( command.data )
        }
      }
    }

    client.on( 'messageCreate' , async function( message ){
      if( ! message.content.startsWith( settings.prefix )) return
      if( ! settings.bot && message.author.bot ) return

      var argument = message.content.slice(1).trim().split(/ +/)
      var identifier = argument.shift().toLowerCase()
      var command = commands.find( command => command.command.toLowerCase() == identifier || command.aliases && command.aliases.some( alias => alias.toLowerCase() == identifier ))

      if( ! command ) return
      if( command.guild && command.guild.length != 0 && ! message.guild ) return
      if( command.blockedRoles && command.blockedRoles.length != 0 && command.blockedRoles.some( role => message.member.roles.cache.some( r => r.id == role || r.name == role ))) return
      if( command.blockedUsers && command.blockedUsers.length != 0 && command.blockedUsers.some( user => user == message.author.id ) ) return 
      if( command.permisions && command.permisions.length != 0 && ! message.member.permissions.has(command.permissions)){
        if( command.users && command.users.length != 0 && ! command.users.some( user => user == message.author.id ) ) if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) return
        else if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) return
      }
      if( command.users && command.users.length != 0 && ! command.users.some( user => user == message.author.id )){
        if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) return
        else return
      }
      if( command.roles && command.roles.length != 0 && ! command.roles.some( role => message.member.cache.some( r => r.id == role || r.name == role )) ) return
      if( command.cooldown ){
        var current = Date.now() , cooldown = ms( command.cooldown ) , expiring , remaining
        if( cooldowns.has( `${message.author.id}.${command.command}` ) ){
          expiring = cooldowns.get( `${message.author.id}.${command.command}` ) + cooldown
          if( current < expiring ){
            remaining = expiring - current
            return message.channel.send(`Command Cooldown: ${ ms(remaining) }`)
          }
        } else {
          cooldowns.set( `${message.author.id}.${command.command}`, current )
          setTimeout( () => cooldowns.delete( `${message.author.id}.${command.command}` ), cooldown )
        }
      }
      
      await command.preExecute( message , argument )
      await command.Execute( message , argument )
      await command.postExecute( message , argument )

    })
  }

  get SlashCommands(){
    return class SlashCommands {

      register( options ){
        if( ! options.clientId ) throw new ErrorHandler( Errors.noClientId )
        if( options.commands ) this.scomms = this.scomms.filter( command => command.data.name == command )
        try {
          ( async () => {
            await console.log(`[-] Registering Global Slash Commands`)
            await REST.put( Routes.applicationCommands( options.clientId ? options.clientId : client.id , { body: this.scomms } ) )
            await console.log(`[-] Global Slash Commands registered`)
          })
        } catch (error){
          throw new ErrorHandler( error )
        }
      }

      registerGuild( options ){
        if( ! options.clientId ) throw new ErrorHandler( Errors.noClientId )
        if( ! options.guildId ) throw new ErrorHandler( Errors.noGuildId )
        if( options.commands ) this.scomms = this.scomms.filter( command => command.data.name == command )
        try {
          ( async () => {
            await console.log(`[-] Registering Guild Slash Commands`)
            await REST.put( Routes.applicationGuildCommands( options.clientId , options.guildId , { body: this.scomms } ) )
            await console.log(`[-] Guild Slash Commands registered`)
          })
        } catch (error){
          throw new ErrorHandler( error )
        }
      }

    }
  }

  get( query ){
    if( typeof query != 'string') throw new ErrorHandler( 'Query should be a string containing the name or an alias of the command.' )
    command = thie.commands.find( element => element.command.toLowerCase() == query.toLowerCase() || element.aliases && element.aliases.some( alias => alias.toLowerCase() == query.toLowerCase() ))
    if( command ) return command
    else return false
  }
}

module.exports = CommandHandler