const { MessageEmbed, Message, Client, MessageActionRow, MessageSelectMenu, Interaction } = require("discord.js");
const { readdirSync } = require("fs");
const color = ('#303136');
const prefix = process.env.prefix;
module.exports = {
  name: "help",
  usage: `${prefix}help`,
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
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        let cats = new Object();

        cats = {
          name: name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(
          `\`\`\`js\nPrefix: ${prefix}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](https://poop.com)\n\nTo check out a category, use command \`${prefix}help [category]\` For more information go to the next page by reacting!\n\n__**Categories**__`
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


        const directories = [
        ...new Set(client.commands.map((cmd) => cmd.directory))
    ]

    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

    const _categories = directories.map((dir) => {
        const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
            return {
                name: cmd.name || 'No name',
                description: cmd.description || 'No description',
            }
        })
        return {
            directory: formatString(dir),
            commands: getCommands,
        }
    })


    // const embed = new MessageEmbed()
    // .setColor(color)
    // .setDescription('Please choose a category')
    
    
    const components = (state) => [
        new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId('help-menu')
            .setPlaceholder('Please select a category')
            .setDisabled(state)
            .addOptions(
                _categories.map((cmd) => {
                    return {
                        label: cmd.directory,
                        value: cmd.directory.toLowerCase(),
                        description: `Commands from ${cmd.directory} category`,
                        emoji: emo[cmd.directory.toLowerCase()] || null
                    }
                })
            
            

            //     [
            //     {
            //         label: 'Select me',
            //         description: 'This is a description',
            //         value: 'first_option',
            //     },
            //     {
            //         label: 'You can select me too',
            //         description: 'This is also a description',
            //         value: 'second_option',
            //     },
            //     {
            //         label: 'I am also an option',
            //         description: 'This is a description as well',
            //         value: 'third_option',
            //     },
            // ]

            )
        ),
    ]

    const initialmessage = await message.channel.send({
        embeds: [embed],
        components: components(false)
    })

    const filter = (interaction) => 
        interaction.user.id === message.author.id;
    
    const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: 'SELECT_MENU',
        time: 120000,
    })

    collector.on('collect', async (interaction) => {
        const [ directory ] = interaction.values
        const category = _categories.find(
            (x) => x.directory.toLowerCase() === directory
        )
       
        const categoryEmbed = new MessageEmbed()
        .setTitle(`__${formatString(directory)} commands__`)
        .setColor(color)
        .setDescription("Here is the list of commands")
        .addFields(
            await category.commands.map((cmd) => {
                let emo = `${client.commands.get(cmd.name).emoji}` || "";
                return {
                    name: `${emo}\`${cmd.name}\``,
                    value: cmd.description,
                    inline: true,
                }
            })
        )
        interaction.update({embeds: [categoryEmbed]})

        // const embed3 = new MessageEmbed().setDescription('3')
        // if (interaction.values[0] == 'third_option') {
        //     interaction.update({embeds: [embed3]})
        // }
    })

    collector.on("end", () => {
        const embed = new MessageEmbed()
        .setDescription('Timeout, please run the command again to use.')
        .setColor('RED')

        initialmessage.edit({
            embeds: [embed],
        }, components(true))

    })

    } else {
      let cots = [];
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = `${client.commands.get(name).description}`;
          let emo = `${client.commands.get(name).emoji}`;

          let obj = {
            cname: `${emo} \`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      // console.log(cots);

      const command = client.commands.get(args[0].toLowerCase()); // ||
      // client.commands.find(
      //   (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      // );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } commands__`
          )
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color);

        return message.channel.send({ embeds: [combed] });
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "🚫"
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "🚫"
        )
        .setFooter(
          // `Requested by ${message.author.tag}`,
          // message.author.displayAvatarURL({
          //   dynamic: true,
          // })
          {text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({dynamic: true, size: 4096})}
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send({ embeds: [embed] });
    }
  },
};
