class ErrorHandler extends Error {
  constructor ( error ){
    if( error instanceof Error ){
      super( error.message )
      Error.captureStackTrace( this , this.constructor )
    } else super( error )
    this.name = 'DisguardError' 
  }
}

module.exports = ErrorHandler