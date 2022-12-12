const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})


client.on('ready', () => {
  // See the "Language Support" section of this documentation
  // An empty string = ignored
  const messagesPath = 'languages.json'

  // Used to configure the database connection.
  // These are the default options but you can overwrite them
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  // Initialize WOKCommands with specific folders and MongoDB
  const wok = new WOKCommands(client, {
    commandsDir: 'commands',
    featureDir: 'features',
    messagesPath,
    showWarns: true, // Show start up warnings
    dbOptions
    
  })

   wok.on('databaseConnected', (connection, state) => {
    console.log('The state is', state)
  })

  // Ran when a server owner attempts to set a language that you have not supported yet
  wok.on('languageNotSupported', (message, lang) => {
    console.log('Attempted to set language to', lang)
  })
  
    // Set your MongoDB connection path
    .setMongoPath(process.env.MONGO_URI)
    // Set the default prefix for your bot, it is ! by default
    .setDefaultPrefix('vct')
    // Set the embed color for your bot. The default help menu will use this. This hex value can be a string too
    .setColor(0xff0000)
    .setCategorySettings([
      {
        name: 'General',
        emoji: '👑',
        hidden: false
      },
      {
        name: 'Fun',
        emoji: '🎮'
      },
      {
        name: 'Economy',
        emoji: '💸'
      },
      {
        // You can change the default emojis as well
        name: 'Configuration',
        emoji: '🚧',
        //  You can also hide a category from the help menu
        //  Admins bypass this
        hidden: false
      }
    ])
    .setBotOwner(['180690270981980161'])
    
})

client.on('ready', () => {
  // Initialize WOKCommands
  new WOKCommands(client, {
    // Can be a single string as well
    testServers: ['743013733323767820']
  })

  new WOKCommands(client, instance, 'commands', 'features').setSyntaxError(instance.messageHandler.get(guild, 'SYNTAX_ERROR'))

})




client.login(process.env.TOKEN)