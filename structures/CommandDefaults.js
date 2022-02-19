module.exports = {

  command: 'command',
  description: 'Developer didn\'t speecify the description of this command.',
  arguments: [],
  blockedRoles: [],
  blockedUsers: [],
  permissions: [],
  roles: [],
  users: [],
  data: {},
  cooldown: '0s',
  guilds: [ ],
  
  preExecute: async function preExecute (){},
  Execute: async function Execute(){},
  postExecute: async function postExecute (){},

  preSlashExecute: async function preSlashExecute(){},
  slashExecute: async function slashExecute(){},
  postSlashExecute: async function postSlashExecute(){}

}