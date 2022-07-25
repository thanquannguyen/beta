const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() }

module.exports = {
  name: "userinfo",
  usage: "zak userinfo [member]",
  emoji: "💁‍♂️",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
    let user;

    if (!args[0]) {
      user = message.member;
    } else {
      user =
        message.mentions.members.first() ||
        (await message.guild.members.fetch(args[0]).catch((err) => {
          return message.channel.send(":x: Unable to find this Person");
        }));
    }

    if (!user) {
      return message.channel.send(":x: Unable to find this person!");
    }

    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png",
    };

    //NOW BADGES
    let badges = await user.user.flags;
    badges = (await badges) ? badges.toArray() : ["None"];

    let newbadges = [];
    badges.forEach((m) => {
      newbadges.push(m.replace("_", " "));
    });

    let embed = new MessageEmbed().setThumbnail(
      user.user.displayAvatarURL({
        dynamic: true,
      })
    );

    //ACTIVITY
    let array = [];
    let perms = [];
    for (let [key, value] of Object.entries(user.permissions.serialize())) {
      if (value == true) {
          perms.push(key);
      } else {
          continue;
      }
    }

    
    if (user.presence.activities.length) {
      let data = user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None";
        let xname = data[i].details || "None";
        let zname = data[i].state || "None";
        let type = data[i].type;

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``);

        if (data[i].name === "Spotify") {
          embed.setThumbnail(
            `https://i.scdn.co/image/${data[i].assets.largeImage.replace(
              "spotify:",
              ""
            )}`
          );
        }

        embed.setDescription(array.join("\n"));
      }
    }

    //EMBED COLOR BASED ON member
    embed.setColor("#303136");

    //OTHER STUFF
    embed.setAuthor(
      // user.user.tag,
      // user.user.displayAvatarURL({
      //   dynamic: true, size: 4096
      // })
      {name: user.user.tag, iconURL: user.user.displayAvatarURL({ dynamic: true, size: 4096})}
    );
    

    //CHECK IF USER HAVE NICKNAME
    if (user.nickname !== null) embed.addField("<a:VC_k_:704210617405538314> Nickname", user.nickname, true);
    embed
      .addField("<a:VC_k_:704210617405538314> Joined At", moment(user.joinedAt).format("LLLL"), true)
      .addField(
        "<a:VC_k_:704210617405538314> Account Created At",
        moment(user.user.createdAt).format("LLLL"), true
      )
      .addField("<a:VC_k_:704210617405538314> Badges", capitalize(newbadges.join(", ")) || "None", true)
      .addField(
        "<a:VC_k_:704210617405538314> Common Information",
        `<a:VC_wumpus:713187570741149787> ID: \`${user.user.id}\`\n<a:VC_wumpus:713187570741149787> Discriminator: ${user.user.discriminator}\n<a:VC_wumpus:713187570741149787> Bot: ${user.user.bot}\n<a:VC_wumpus:713187570741149787> System: ${user.user.system}`, true
      )
      .addField('<a:VC_k_:704210617405538314> Roles:', user.roles.cache.map(r => `${r}`).join(', '))
      .addField("<a:VC_k_:704210617405538314> Permissions:", perms.map(perm => capitalize(perm.replace(/_/g, ' '))).join(', '), false)
      .setFooter({text: `Status: ${user.presence.status}`, iconURL: stat[user.presence.status]})

    return message.channel.send({ embeds: [embed] }).catch((err) => {
      return message.channel.send("Error : " + err);
    });
  },
};
