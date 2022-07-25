const { MessageEmbed } = require("discord.js");
const prefix = process.env.prefix;
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
  name: "delrole",
  aliases: ['delr'],
  category: "moderation",
  description: "Add role to the user.",
  usage: `${prefix}addrole`,
  // timeout: 10000,
  emoji: "🏓",

  run: async (client, message, args) => {
    let userroles = message.mentions.users.first() || client.users.cache.get(args[0]);
    let roleNames = args.slice(1);
    if (!userroles) {
        roleNames = args;
        message.guild.members.fetch(message.author.id).then((user) => {
            let roleSet = new Set(roleNames);
            let { cache } = message.guild.roles;
            roleSet.forEach(roleName => {
            let role = cache.find(role => role.name.toLowerCase().includes(roleName.toLowerCase()));
            if(role) {
                if(user.roles.cache.some(role => role.name === role)) {
                    message.channel.send("You already removed this role!");
                    return;
                }
                if(checkPermissionRole(role)) {
                    message.channel.send("You cannot remove yourself to this role.");
                }
                else {
                    user.roles.remove(role)
                        .then(member => message.channel.send("You were removed from this role!"))
                        .catch(err => {
                            console.log(err);
                            message.channel.send("Something went wrong...");
                        });
                }
            }
            else {
                message.channel.send("Role not found!");
            }
            });
        })
    } else {
        message.guild.members.fetch(userroles.id).then((user) => {
            let roleSet = new Set(roleNames);
            let { cache } = message.guild.roles;
            roleSet.forEach(roleName => {
            let role = cache.find(role => role.name.toLowerCase().includes(roleName.toLowerCase()));
            if(role) {
                if(user.roles.cache.some(role => role.name === role)) {
                    message.channel.send("You already removed this role!");
                    return;
                }
                if(checkPermissionRole(role)) {
                    message.channel.send("You cannot remove yourself to this role.");
                }
                else {
                    user.roles.remove(role)
                        .then(member => message.channel.send("You were removed to this role!"))
                        .catch(err => {
                            console.log(err);
                            message.channel.send("Something went wrong...");
                        });
                }
            }
            else {
                message.channel.send("Role not found!");
            }
            });
        })
    }
    
  },
};
