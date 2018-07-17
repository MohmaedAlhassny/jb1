const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'
const fs = require('fs')


 
client.on('message',async message => {
  if(message.content.startsWith(prefix + "bc")) {
	  if(!message.author.Permission('ADMINSTRATOR')) return message.channel.send('No!');
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
    message.channel.send(':regional_indicator_b::regional_indicator_c:| **ارسل الرسالة الان**').then(msg => {

    let awaitM = message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000,
      errors: ['time']
    })
    .then(collected => {
      collected.first().delete();
      thisMessage = collected.first().content;
      msg.edit(':regional_indicator_b::regional_indicator_c:| **هل انت متأكد؟**');
      let awaitY = message.channel.awaitMessages(response => response.content === 'نعم' || 'لا' && filter,{
        max: 1,
        time: 20000,
        errors: ['time']
      })
      .then(collected => {
        if(collected.first().content === 'لا') {
          msg.delete();
          message.delete();
          thisFalse = false;
        }
        if(collected.first().content === 'نعم') {
          if(thisFalse === false) return;
        message.guild.members.forEach(member => {
          msg.edit(':regional_indicator_b::regional_indicator_c:| **جاري الارسال**');
          collected.first().delete();
          member.send(`${thisMessage}`);
        });
        }
      });
    });
    });
  }
});



client.on('ready', () => {
console.log(`Login as [ ${client.user.username} ]`)
	client.user.setUsername('Smile Server.');
client.user.setGame(`Smile Server. ${client.users.size}`, "https://twitch.tv/SmileServer")
}); 


	client.on('message', msg => {
if(msg.content === prefix + 'ping') {
msg.channel.send('**Pong :` ' + `${client.ping}` + ' `**')
	}
})


client.login(process.env.BOT_TOKEN);
