const CommandHandlerDefaults = require('../structures/CommandHandlerDefaults')
const CommandDefaults = require('../structures/CommandDefaults')
const EventDefaults = require('../structures/EventDefaults')

class UtilsManager {

  constructor (){ }

  validateCommandHandlerSetttings( settings ){

    let warnings = []
    let output = {}

    for( const key of Object.keys(CommandHandlerDefaults) ){
      if( ! settings[key] ) output[key] = CommandHandlerDefaults[key]
      else output[key] = settings[key]
    }
    for( const key of Object.keys(output)){
      if( typeof output[key] !== typeof CommandHandlerDefaults[key] ){
        output[key] = CommandHandlerDefaults[key]
        warnings.push( `The ${ key } of CommadHandler should be a ${ typeof CommandHandlerDefaults[key] } not a ${ typeof settings[key] }, default value has been set instead.` )
      }
    }

    warnings.length ? console.log( `[AutoBot] CommandHandler Warnings:\n---------\n${ warnings.join('\n') }\n---------` ) : null
    return output

  }

  validateEvent( event ){

    let warnings = []
    let output = {}

    for( const key of Object.keys(EventDefaults)){
      if( ! event[key] )output[key] = EventDefaults[key]
      else output[key] = event[key]
    }
    for( const key of Object.keys(output)){
      if( typeof output[key] !== typeof EventDefaults[key] ){
        output[key] = EventDefaults[key]
        warnings.push( `The ${ key } of ${ output.event } should be a ${ typeof EventDefaults[key] } not a ${ typeof command[key] }, default value has been set instead.` )
      }
    }

    warnings.length ? console.log( `[AutoBot] Event (${ output.command }) Warnings:\n---------\n${ warnings.join('\n') }\n---------` ) : null
    return output

  }

  validateCommand( command ){

    let warnings = []
    let output = {}

    for( const key of Object.keys(CommandDefaults) ){
      if( ! command[key] ){
        output[key] = CommandDefaults[key]
      } else {
        output[key] = command[key]
      }
    }
    for( const key of Object.keys(output)){
      if( typeof output[key] !== typeof CommandDefaults[key] ){
        output[key] = CommandDefaults[key]
        warnings.push( `The ${ key } of ${ output.command } should be a ${ typeof CommandDefaults[key] } not a ${ typeof command[key] }, default value has been set instead.` )
      }
    }

    warnings.length ? console.log( `[AutoBot] Command (${ output.command }) Warnings:\n---------\n${ warnings.join('\n') }\n---------` ) : null
    return output

  }
}

module.exports = UtilsManager