const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'
const fs = require('fs')


const moment = require("moment");
client.on('message', async message => {
    if (!message.channel.guild) return undefined;
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "bc")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_SERVER")) return message.reply("**# You don't have the needed permissions!**");
        if(!args) return message.reply("**# Supply a message!**");
        message.channel.send(`\`\`- Name:\`\`\n${message.author}\n\n\`\`- Date:\`\`\n${time}\n\n\`\`- Message:\`\`\n${args}\n\n__# | You have 15s to say يب or لا__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === 'يب', {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
          message.guild.members.forEach(m => m.sendMessage(args));
          message.channel.send(`**Done!, Sent the message to: \`${message.guild.members.size}\` members!**`);

  });
});
    } else {
          message.channel.awaitMessages(response => response.content === 'لا', {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.send("__- Canceled!__")
    });
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
