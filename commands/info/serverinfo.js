const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "serverinfo",
    // aliases: ['', ''],
    // category: "",
    // description: "",
    // usage: ``,
    // timeout: 1000,
    // emoji: "",
    // userPermission: ['', ''],
    // botPermission: ['', ''],
    // premium: false,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "No Emoji!";
    const Roles = guild.roles.cache.size || "No Roles!";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    await console.log(guild)
    const embed = new MessageEmbed()
      .setTitle("Info of " + guild.name)
      .setColor("#51ff23")
      .setThumbnail(guild.iconURL())
      .addField(`Name`, guild.name, true)
      .addField(`ID`, `${guild.id}`, true)
      .addField(`Owner`, `${guild.ownerId}`, true)
    //   .addField(`Roles Count`, Roles, true)
    //   .addField(`Emojis Count`, Emojis, true)
    //   .addField(`Members Count`, Members, true)
    //   .addField(`Humans Count`, Humans, true)
    //   .addField(`Bots Count`, Bots, true)
      .addField(`Server Created At`, guild.createdAt.toDateString())
      .setFooter({text: `Requested by ${message.author.username}`})
      .setTimestamp();
      
      message.channel.send({embeds: [embed]});
    }
}