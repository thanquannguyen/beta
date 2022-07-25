const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const si = require('systeminformation')
let cpuStat = require("cpu-stat");
let os = require("os");
module.exports = {

    name: "botinfo", //the command name for execution & for helpcmd [OPTIONAL]
    description: "Shows Bot Information", //the command description for helpcmd [OPTIONAL]
    emoji: "🏓",
    run: async (client, interaction) => {
        const cpu = await si.cpu();
        try {

            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new MessageEmbed()
                        // .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setAuthor({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                        .setTitle("__**Stats:**__")
                        .setColor("RANDOM")
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 Cores", `\`${cpu.cores}\``)
                        .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                        .addField("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                        // .addField("\u200b", `\u200b`, true)
                        .addField("📁 Users", `\`Total: ${client.users.cache.size} Users\``, true)
                        .addField("📁 Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                        //.addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("📁 Channels", `\`${client.channels.cache.size}\``, true)
                        .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                        .addField("🛰️API Latency", `\`${client.ws.ping}ms\``, true)
                        .addField("📶 Heap", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps\``, true)
                        .setFooter({text: "DeElf"});
                    interaction.reply({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new MessageEmbed()
                        // .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setAuthor({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                        .setColor("RANDOM")
                        .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Users", `\`${client.users.cache.size} Users\``, true)
                        .addField("📁 Servers", `\`${client.guilds.cache.size} Servers\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                        .addField("API Latency", `\`${client.ws.ping}ms\``, true)
                        .setFooter({text: "DeElf"});
                        interaction.reply({
                        embeds: [botinfo]
                    });
                }
            })

            function duration(duration, useMilli = false) {
                let remain = duration;
                let days = Math.floor(remain / (1000 * 60 * 60 * 24));
                remain = remain % (1000 * 60 * 60 * 24);
                let hours = Math.floor(remain / (1000 * 60 * 60));
                remain = remain % (1000 * 60 * 60);
                let minutes = Math.floor(remain / (1000 * 60));
                remain = remain % (1000 * 60);
                let seconds = Math.floor(remain / (1000));
                remain = remain % (1000);
                let milliseconds = remain;
                let time = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds
                };
                let parts = []
                if (time.days) {
                    let ret = time.days + ' Day'
                    if (time.days !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.hours) {
                    let ret = time.hours + ' Hr'
                    if (time.hours !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.minutes) {
                    let ret = time.minutes + ' Min'
                    if (time.minutes !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)

                }
                if (time.seconds) {
                    let ret = time.seconds + ' Sec'
                    if (time.seconds !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (useMilli && time.milliseconds) {
                    let ret = time.milliseconds + ' ms'
                    parts.push(ret)
                }
                if (parts.length === 0) {
                    return ['instantly']
                } else {
                    return parts
                }
            }
            return;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */