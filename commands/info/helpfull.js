const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const color = ('#303136');
const prefix = process.env.prefix;
module.exports = {
  name: "helpfull",
  usage: `${prefix}helpfull`,
  emoji: "ℹ",
  timeout: 5000,
  description: "Shows all available bot commands.",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String} args 
   * @returns 

   */
  run: async (client, message, args) => {
    if (!args[0]) {
      let categories = [];
      let catts = [];


    //   let ignored = ["owner"];

      const emo = {
        fun: "🎆",
        image: "🖼️",
        info: "❓",
        moderation: "⚒️",
        utility: "⚙️",
        owner: "👑",
        tutorial: "📚",
      };

      readdirSync("./commands/").forEach((dir) => {
        // if (ignored.includes(dir.toLowerCase())) return;
        const namec = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        let cats = new Object();

        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
  
            if (!file.name) return "No command name.";
  
            let name = file.name.replace(".js", "");
            let emo = `${client.commands.get(name).emoji}`;

  
            return `\`${name}\``;
        });

        cats = {
          name: namec,
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          inline: false,
        };

        categories.push(cats);
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(
          `\`\`\`js\nPrefix: ${prefix}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](https://poop.com)\n\nUse \`${prefix}help\` followed by a command name to get more information on a command. For example: \`${prefix}help ping\`.\n\n__**List of commands**__\n\n`
        )
        .addFields(categories)
        .setFooter(
          // `Requested by ${message.author.tag}`,
          // message.author.displayAvatarURL({
          //   dynamic: true,
          // })
          {text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({dynamic: true, size: 4096})}
        )
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(color);

      return message.channel.send({ embeds: [embed] });
    } 
  },
};
