const client = require("../index");
const prefix = process.env.prefix;
const { Collection, Client, MessageEmbed } = require('discord.js')
const mongo = require('../utils/mongo')
const timeout = new Collection();
const ms = require('ms')
const translate = require('@iamtraction/google-translate')
const languageSchema = require('../schemas/language-schema')
const prefixSchema = require('../schemas/prefix-schema')
const language = require('../utils/language')


 /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
*/

// client.translate = async(text, message) => {
//   const { guild } = message
//   let lang = ''
//   await mongo().then(async (mongoose) => {
//     try {
//       const data = await languageSchema.findOne({ _id: guild.id })
//         if (data) {
//           lang = data.language
//         } else lang = 'english'
//     } finally {
//       mongoose.connection.close()
//     }
//   })

//   const translated = await translate(text, {from: 'english', to: lang})
//   return translated.text;
// }

client.prefix = async function(message) {
  const { guild } = message
  let cus = ''
  await mongo().then(async (mongoose) => {
    try {
      const data = await prefixSchema.findOne({ Guild: guild.id })
      if (data) {
        cus = data.Prefix
      } else cus = prefix
    } catch (error) {
      console.log()
    }
  })
  return cus
}

const usersMap = new Map();
const LIMIT = 3;
const TIME = 7000;
const DIFF = 100000;

client.on("messageCreate", async (message) => {
  // if (!message.content.startsWith(prefix)) return;

  // if (message.author.bot) return;

  // const args = message.content.slice(prefix.length).trim().split(/ +/g);

  // const cmd = args.shift().toLowerCase();

  // let command = client.commands.get(cmd);

  // if (command) {
    // if(command.timeout) {
    //     if(timeout.has(`${command.name}${message.author.id}`)) 
    //     return message.channel.send(`Please wait \`${ms(timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\`.`).then(msg => {
    //         setTimeout(() => {
    //         // const deleteEmbed = new Discord.MessageEmbed();
    //         msg.delete(message);
    //         }, 5000);
    //     });
    //     command.run(client, message, args);
    //     timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
    //     setTimeout(() => {
    //         timeout.delete(`${command.name}${message.author.id}`)
    //     }, command.timeout)
  //   } else command.run(client, message, args);



  //   // message.channel.reply('Bot đang update! Vui lòng thử lại sau.\nBot is updating! Please try later.')
    
  // }

  const p = await client.prefix(message)
    if (
      message.author.bot ||
      // !message.guild ||
      !message.content.toLowerCase().startsWith(p)
  )
      return;

  const [cmd, ...args] = message.content
      .slice(p.length)
      .trim()
      .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  if (command) {
    const { guild } = message

    if (!message.member.permissions.has(command.userPermissions || [])) 
      return message.channel.send(`You need the following permissions to run this command: ${command.userPermissions.map((value) => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/gi, ' ')}`).join(', ')}`)
    if (!message.guild.me.permissions.has(command.botPermissions || [])) 
      return message.channel.send(`I need the following permissions to run this command: ${command.botPermissions.map((value) => `${value[0].toUpperCase() + value.toLowerCase().slice(1).replace(/_/gi, ' ')}`).join(', ')}`)

    if(command.timeout) {
      if(timeout.has(`${command.name}${message.author.id}`)) {
        message.react('❌')
        return message.channel.send(`${language(guild, "PLEASE_WAIT")} **${ms(timeout.get(`${command.name}${message.author.id}`) - Date.now())}**.`).then(msg => {
          setTimeout(() => {
          // const deleteEmbed = new Discord.MessageEmbed();
          msg.delete(message);
          }, 5000);
        });
      }
      
      command.run(client, message, args);
      timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
      setTimeout(() => {
          timeout.delete(`${command.name}${message.author.id}`)
      }, command.timeout)  
    } else await command.run(client, message, args);
    
    if(usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;

      if(difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
              usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, userData)
      }
      else {
          ++msgCount;
          if(parseInt(msgCount) === LIMIT && command) {
              message.channel.send('Too fast, please slow down.').then((msg) => {
                setTimeout(() => {
                  msg.delete(message)  
                }, 2000)
              })
              return
          } else {
              userData.msgCount = msgCount;
              usersMap.set(message.author.id, userData);
          }
      }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
  } 


});

client.sim = async function(message) {
  const { guild } = message
  let result = ''
  await mongo().then(async (mongoose) => {
    try {
      const data = await simSchema.findOne({ _id: guild.id })
      if (data) {
        result = data.ChannelID
        console.log(result)
      } else result = '';
    } catch (error) {
      console.log()
    }
  })
  return result;
}

client.on("messageCreate", async (message) => {
  const p = await client.prefix(message)
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  if (message.mentions.has(client.user.id)) {
    const embed = new MessageEmbed()
    .setColor('#FFFFFF')
       .setTitle('DeElf')
       .setDescription(`prefix for this server is: ${p}`)
      //  .setFooter('DeElf', 'https://images-ext-2.discordapp.net/external/aisnEzL5f1Bc7Hra6p4cRzrgwngthfKysawofb1i57M/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/890999674423636038/50410eeb56254b4047adb3787bdaaf5f.webp?width=406&height=406')
    message.channel.send({
      embeds: [embed]
    })
  };
});


const querystring = require('querystring')
const fetch = require('node-fetch')

client.on("messageCreate", async message => {
  const channelid = await client.sim(message)
  if (message.author.bot) return;
  if (message.channel.id == `${channelid}`) {
    const query = querystring.stringify({ text: message.content });
    const { success } = await fetch(`https://api.simsimi.net/v2/?${query}&lc=vn`).then(success => {if (success) return success.json()}).catch(error => console.log(error))
    if (success) {
      message.reply(success).catch(error => console.log(error));
    } else return;
  }
});

