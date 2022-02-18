module.exports = {

  command: 'Help',
  guild: true,

  async preExecute(){
    console.log('preExecute')
    setTimeout( () => { console.log('finish') }, 20000 )
  },

  async Execute( message , arguments ){
    console.log('execute')
    setTimeout( () => { console.log('finish') }, 20000 )
  },

  async postExecute( message , arguments ){
    console.log('postExecute')
  }

}