const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'
const fs = require('fs')


const moment = require("moment");
client.on('message', msg =>{
    let message=msg;
    if(message.content.startsWith(prefix + "bc")){
        var args = message.content.split(' ').slice(1).join(' ');
    msg.guild.members.forEach(m=>{
        m.send(args.replace(/[user]/g,m)).catch();
    if(message.attachments.first()){
m.sendFile(message.attachments.first().url).catch();
    }
    })    ;
    }
});



client.on('ready', () => {
console.log(`Login as [ ${client.user.username} ]`)
client.user.setGame(`${prefix}help + ${prefix}invite | ${client.guilds.size} server.`, "https://twitch.tv/L3bBot")
});



	client.on('message', msg => {
if(msg.content === prefix + 'ping') {
msg.channel.send('**Pong :` ' + `${client.ping}` + ' `**')
	}
})


client.login(process.env.BOT_TOKEN);
