const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = '#';

client.on("message", message => {
 if (message.content === `${prefix}help`) {
   message.channel.send(`${client.ping} ms`);
   }
});

client.login(process.env.BOT_TOKEN);
