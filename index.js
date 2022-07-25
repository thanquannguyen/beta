require('dotenv').config()
const { Client, Intents, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const fs = require('fs');
const { promisify } = require('util');
const client = new Client({ 
    shards: "auto",
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    // intents: 32767,
    ws: {
        properties: {
            $browser: "Discord iOS" // or "Discord Android", doesn't matter lol
        },
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    failIfNotExists: false,
    disalbeMentions: "all",
    restTimeOffset: 0,
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
require("./handler")(client);


// let commandFolder = fs.readdirSync('./commands/')
// commandFolder.forEach((dir) => {
//     const commandFile = fs
//     .readdirSync(`./commands/${dir}/`)
//     .filter((file) => file.endsWith('.js'))
    
//     for (const file of commandFile) {
//         const command = require(`./commands/${dir}/${file}`)
//         client.commands.set(command.name, command);
//     }
// })

// let eventFolder = fs
//     .readdirSync('./events')
//     .filter((file) => file.endsWith('.js'))

//     for (const file of eventFolder) {
//         const event = require(`./events/${file}`)
//         const eventname = file.split('.')[0]
//     }


(async () => {
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');  
})();

//invite: https://discord.com/oauth2/authorize?client_id=858371436245549076&permissions=8&scope=applications.commands%20bot

client.login(process.env.token);