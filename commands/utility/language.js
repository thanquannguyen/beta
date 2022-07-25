const { MessageEmbed } = require('discord.js')
const mongo = require('../../utils/mongo')
const languageSchema = require('../../schemas/language-schema')
const { languages } = require('../../language.json')
const { setLanguage } = require('../../utils/language') 
const language = require('../../utils/language')

module.exports = {
  name: "language",
  category: "utility",
  description: "Change language of the bot",
  usage: `${process.env.prefix}language <language>`,
  timeout: 10000,
  emoji: "💭",

  run: async (client, message, args) => {
    const { guild } = message

    if (!args[0]) {
      
      const embed = new MessageEmbed()
      .setDescription('**LANGUAGUE**\nVietnamese\nEnglish')
      message.reply({embeds: [embed]})
      return;
    }

    const targetLanguage = args[0].toLowerCase()
    if (!languages.includes(targetLanguage)) {
      message.reply('That language is not supported.')
      return
    }

    setLanguage(guild, targetLanguage)

    await mongo().then(async (mongoose) => {
      try {
        await languageSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            language: targetLanguage,
          },
          {
            upsert: true,
          }
        )

        message.reply(`${language(guild, 'LANGUAGE_SET')}`)
      } finally {
        mongoose.connection.close()
      }
    })  
  }
}


// Auto translate using google API
// "=================================================================================================================================================================="


// const mongo = require('../../utils/mongo')
// const languageSchema = require('../../schemas/language-schema')
// const prefix = process.env.prefix
// const { Permissions } = require('discord.js');
// const langjson = require('../../lang.json')

// module.exports = {
//     name: "setlang",
//     category: "utility",
//     description: "Change language of the bot",
//     usage: `${prefix}setlang <language>`,
//     timeout: 10000,
//     emoji: "💭",
  
    // run: async (client, message, args) => {
//         const { guild } = message
//         if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
//         const lang = args[0];
        
//         if (!lang) {
//             message.reply(`${await client.translate('Please specify a language.', message)}`)
//             return
//         } 
//         // else if (!lang == langjson.vi) {
//         //   if (!lang == langjson.vi.name.toLowerCase()) {
//         //     message.channel.send('sai')
//         //     return
//         //   }
//         // }
//         let kt = new Boolean(false);
//         for (let i = 0; i < langjson.list.length; i++) {
//           if (langjson.list[i].code == lang || langjson.list[i].name == lang) {
//             kt = true;
//           }
//         }
//         if (kt == false) {
//           message.channel.send('Wrong language. Please try again.')
//           return
//         } else {
//           await mongo().then(async (mongoose) => {
//             try {
//                 await languageSchema.findOneAndUpdate(
//                   {
//                     _id: guild.id,
//                   },
//                   {
//                     _id: guild.id,
//                     language: lang,
//                   },
//                   {
//                     upsert: true,
//                   }
//                 )
  
//                 message.reply(`${await client.translate(`Language set to ${lang}`, message)}`)
//               } finally {
//                 mongoose.connection.close()
//               }    
//         })
//         }
//     },
//   };