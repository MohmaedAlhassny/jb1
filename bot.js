const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$'
const fs = require('fs')
const games = JSON.parse(fs.readFileSync('./games.json', "utf8"));


const moment = require("moment");
client.on('message', async message => {
    if (!message.channel.guild) return undefined;
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "bc")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_SERVER")) return message.reply("**# You don't have the needed permissions!**");
        if(!args) return message.reply("**# Supply a message!**");
        message.channel.send(`\`\`- Name:\`\`\n${message.author}\n\n\`\`- Date:\`\`\n${time}\n\n\`\`- Message:\`\`\n${args}\n\n__# | You have 15s to say Yes or No__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === 'yes', {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
                let bcEmbed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
          .setDescription(`${args}`)
          message.guild.members.forEach(m => m.sendMessage(bcEmbed));
          message.channel.send(`**Done!, Sent the message to: \`${message.guild.members.size}\` members!**`);

  });
});
    } else {
          message.channel.awaitMessages(response => response.content === 'no', {
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


client.on('message', message => {
  if(message.content === prefix + 'invite') {
    message.react('👀');

    var inv = '❥ https://goo.gl/fDQiRz ♯ رابط دعوة البوت.';

    message.author.send(help);
  }
});


var help = `**Help commands | أوامر المساعدة

Bot Prefix > [ $ ] < بريفكس البوت
Bot Statsics > ${prefix}stats < احصائيات البوت
Bot Leaderboard > Soon < اعلى لاعبين على البوت
Server Leaderboard > Soon < أعلى لاعبين على السيرفر
View Points > $points < لعرض نقاطك
View your friends points > $points @User123 < لمعرفة نقاط اصدقائك
Support Server : https://discord.gg/39FksCH سيرفر الدعم الفني
Invite link:  https://goo.gl/fDQiRz رابط دعوة البوت الى سيرفرك

* البوت حالياً في طور البيتاً أي خاضع للصيانة في أي وقت..
* أن حدث أي خطأ في البوت الرجاء منكم تبليغنا في سيرفر الدعم الفني
* كل لعبه لها نقاطها الخاصة ، كل ماتخسر؟ تنقص نقطة وتجيك خسارة
* ونشكركم على أستعمال لعب بوت.

★-----------------------------------------------------★
                      ❥ Our games.

● ${prefix}فكك
● ${prefix}اعلام
● ${prefix}سؤال
● ${prefix}سرعه [*NEW*]
● ${prefix}مشاهير [صيانة]
● ${prefix}ترتيب
● ${prefix}لغز

★-----------------------------------------------------★**`;




client.on('message', message => {
  if(message.content === prefix + 'help') {
    message.react('👀');
    message.author.send(help);
  }
});

client.on('message', message => {
  if(message.content === prefix + 'stats') {
    message.channel.send('**I have `' + `${client.guilds.size}` + '` Server :fire:, `' + `${client.channels.size}` + '` Channels and `' + `${client.users.size}` + '` users.**')
    message.channel.send('**- If you want me to join in your server? just do `' + `${prefix}invite` + '` **');
  }
});



client.on('message', message => {
  if (message.content.startsWith(prefix + 'مشاهير')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;


    const fa = new Discord.RichEmbed()
	
    var x = [''];
  var x2 = [''];
	  var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Famous | مشاهير ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('AQUA')
.setImage(x[x3])
.setDescription('**→ `' + 'قم بكتابة أسم هذا المشهور' + '` **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 10000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        const embed = new Discord.RichEmbed()
        .setDescription('** :negative_squared_cross_mark:  | أنتهى الوقت ولم يقم احد بلأجابة الجواب الصحيح هو `' + x2[x3] +'`**')
        .setColor('#c93f3f')
		.setAuthor("✦ Famous | مشاهير ✦")
		.setFooter("-1 Points | +1 Loses")
        return message.channel.send(embed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
		  	.setAuthor("✦ Famous | مشاهير ✦")
			.setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
			.setColor('GREEN')
			.setFooter("+6 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 6;
                })
      })
  }
})

client.on('message', message => {
  if (message.content.startsWith(prefix + 'عكس')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;


    const trteeeb = new Discord.RichEmbed()

var x = ['عقرب', 'قاسي', 'قفص', 'صفقه', 'بالي', 'بيرفكت', 'تفكيري', 'قمر', 'يزيت', 'وينك', 'خلاص', 'ياه', 'جمجمه', 'كوبا', 'كما', 'بص', 'فك', 'فكني', 'مجنون', 'ارافيستا', 'بارا', 'شالو', 'دم', 'سيف', 'ملعب', 'روسية', 'ابن', 'غزوان', 'عمارة', 'وع وع', 'يوم', 'يومين', 'غدارة', 'شايل', 'دلال', 'حريق', 'ويل ياويل', 'حيل', 'ليل', 'طرب', 'خزي', 'صعب', 'وراء', 'امام', 'هموم', 'اسمع', 'دمع', 'قلبي', 'ضيم', 'تستاهل', 'غامد', 'خيال', 'خادم', 'تعالو', 'فجول', 'ايام', 'يوتيوب', 'دسكورد', 'يلع', 'عمري', 'تسأل', 'أهتمام', 'غرام', 'أفكار', 'قشع', 'دكتور', 'علب', 'بلع', 'ناسي', 'اقسى', 'دوار', 'تفكير', 'آخر', 'وينك', 'خلاص', 'ترجمة', 'جم', 'اعدادات', 'برا', 'شالو', 'طكوك', 'ملعب', 'طيارة', 'عمارة', 'مشى', 'دقات', 'عربي', 'قلبي', 'حالة', 'شايل', 'غدارة', 'مشتاق', 'موضوع', 'فراق', 'ليل', 'مكس', 'جنيت', 'قائمة', 'جنح', 'جرح', 'صار', 'قيادة', 'حبوك', 'واو', 'سلطان', 'محمد', 'انور'];
var x = ['برقع', 'يساق', 'صفق', 'هقفص', 'يلاب', 'تكفريب', 'يريكفت', 'مرق', 'تيزي', 'كنيو', 'خ ل ا ص', 'ي ا ه', 'همجمج', 'ابوك', 'امك', 'صب', 'كف', 'ينكف', 'نونجم', 'اتسيفارا', 'اراب', 'ولاش', 'مد', 'فيس', 'بعلم', 'ةيسور', 'نبا', 'ناوزغ', 'ةرامع', 'عو عو', 'ميو', 'نيموي', 'ةرادغ', 'لياش', 'لالد', 'قيرح', 'ليواي ليو', 'ليح', 'ليل', 'برط', 'يزخ', 'بعص', 'ءارو', 'ماما', 'مومه', 'عمسا', 'عمد', 'يبلق', 'ميض', 'لهاتست', 'دماغ', 'لايخ', 'مداخ', 'ولاعت', 'لوجف', 'مايا', 'بويتوي', 'دروكسد', 'علي', 'يرمع', 'لأست', 'مامتهأ', 'مارغ', 'راكفأ', 'عشق', 'روتكد', 'بلع', 'علب', 'يسان', 'ىسقا', 'راود', 'ريكفت', 'رخآ', 'كنيو', 'صلاخ', 'ةمجرت', 'مج', 'تادادعا', 'ارب', 'ولاش', 'كوكط', 'بعلم', 'ةرايط', 'ةرامع', 'ىشم', 'تاقد', 'يبرع', 'يبلق', 'ةلاح', 'لياش', 'ةرادغ', 'قاتشم', 'عوضوم', 'قارف', 'ليل', 'سكم', 'تينج', 'ةمئاق', 'حنج', 'حرج', 'راص', 'ةدايق', 'كوبح', 'واو', 'ناطلس', 'دمحم', 'رونا'];
		var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Reverse | عكس ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('AQUA')
.setDescription('**→ ' + x[x3] + ' **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 10000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        const embed = new Discord.RichEmbed()
        .setDescription('** :negative_squared_cross_mark:  | أنتهى الوقت ولم يقم احد بلأجابة الجواب الصحيح هو `' + x2[x3] +'`**')
        .setColor('#c93f3f')
		.setAuthor("✦ Reverse | عكس ✦")
		.setFooter("-1 Points | +1 Loses")

        return message.channel.send(embed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
		  		.setAuthor("✦ Reverse | عكس ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+5 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 5;
                })
      })
  }
})


client.on('message', message => {
  if (message.content.startsWith(prefix + 'اعلام')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;

    var a3lam = new Discord.RichEmbed()
    var x = ['https://cdn.discordapp.com/attachments/452087517026451456/456180408527355905/-.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180567990468618/thumb2-iraqi-flag-iraq-middle-east-flag-of-iraq-national-flag.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180640916963329/D985D8A7_D987D98A_D8B9D8A7D8B5D985D8A9_D8A7D984D8B3D8B9D988D8AFD98AD8A9.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180756465713163/1.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180814821195778/2Q.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180883171573771/D983D985_D8B9D8AFD8AF_D8A3D984D988D8A7D986_D8B9D984D985_D8A7D984D983D988D98AD8AA.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180922522533892/2000px-Flag_of_Jordan.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456180997835456524/Flag01.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181091917889558/2Q.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181291881332747/morocco.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181491324682250/2000px-Flag_of_Libya.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181538007023626/attachment.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181576326184962/5956948381439567683.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456181628700459012/D8B9D984D985-D984D8A8D986D8A7D986.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456188300621774848/D8B5D988D8B1-D8B9D984D985-D8A7D984D8B3D988D8AFD8A7D986-05-700x300.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456188584224096258/7shi0Tsy8iBwAAAABJRU5ErkJggg.png', 'https://cdn.discordapp.com/attachments/452087517026451456/456188766651154433/KkPClPypPypDwpToFDxLFqbd0vUAAAAASUVORK5CYII.png'];
 	var x2 = ['الجزائر', 'العراق', 'السعودية', 'قطر', 'البحرين', 'الكويت', 'الاردن', 'فلسطين', 'تونس', 'المغرب', 'ليبيا', 'عمان', 'مصر', 'لبنان', 'السودان', 'الامارات', 'اليمن'];
       var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Flags | اعلام ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('AQUA')
.setImage(x[x3])
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 10000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        var failed = new Discord.RichEmbed()
		.setAuthor("✦ Flags | اعلام ✦")
        .setDescription('أنتهى الوقت ولم يقم أحد في الأجابة :sob:')
        .setColor('#c93f3f')
		.setFooter("-1 Points | +1 Loses")

        return message.channel.send(failed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
		  		.setAuthor("✦ Flags | اعلام ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+3 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 3;
                })
      })
  }
})


client.on('message', message => {
  if (message.content.startsWith(prefix + 'فكك')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;

var x = ["Let's see", 'Never gonna catch me', 'Information', 'من متى', 'Things', 'Coming Soon', 'Office', 'Iraqi song', 'How', 'My eyes', 'BOOM', 'Last time', 'Save all', 'Encode', 'Rename', 'Close', 'Save as', 'Open file', 'Middle-East', 'Dektator', 'Dstor', 'Missing', 'Music', 'Songs', 'xx7mood', 'On my head', 'Fire', 'for sell', 'Scoreboard', 'Twitter', 'Facebook', 'Search', 'L3bBot', 'Chatting', 'Swalf', 'Kiss', 'Aywh', 'Minecraft', 'Fortnite', 'Plugins', 'hard work', 'Running', 'undefined', 'I know you', 'Fast typing', 'Something', 'everyone', 'everyday', 'wait please', 'Notes', 'Truth', 'my old', 'Edit', 'Encoding', 'View', 'Macro', 'Language', 'Tools', 'Settings', 'Love', 'be human', 'Heee', 'Soon', 'Boyfriend', 'Girlfriend', 'i know you leave me alone', 'Happy', 'SAD', 'Verb', 'Humans', 'R.I.P XXXTentaction', 'Soul', 'come on', 'Unit', 'Auto', 'Broadcast', 'forever', 'Connections', 'First', 'TheHive', 'Hypixel', 'Lobby', 'ASMR', 'Amanh', 'age', 'old', 'love me', 'I miss you', 'Years', 'Hours', 'Seconds', 'Fake', 'My soul', 'TeamSpeak', 'Jowana', 'Abdullah', 'Dj', 'Night', 'Dancer', 'Eight', 'Loser', 'SnowWhite', 'Lovely', 'TheBeatz', 'Beatz', 'Beats', 'Be carefull', 'وياي', 'اشوا', 'غياب', 'ن و م', 'ملفات', 'عيسى', 'ملايين', 'حلوين', 'المصلاوي', 'شمس', 'عادل أمام', 'خصر', 'ضغط', 'سكر', 'جبال', 'قطر ياعسل', 'التشغيل التلقائي', 'هلا ومية هلا', 'الأول والأخير', 'ضايج', 'صبر', 'عيوني', 'حبه', 'هم هم', 'احزان', 'احساسي وياكم', 'بعد قلبي', 'عندي تسوى كون', 'أكتفى', 'Strong', 'قوي', 'وافويا', 'كوجا', 'ماجنزة', 'مصعب', 'عبدالله العيسى', 'باء', 'هلا بالخميس', 'ويو وي', 'مطوع', 'نورالزين', 'أسامة', 'ليث', 'دكتور', 'الحياة آمل', 'لايدوم', 'واحد ورا الثاني', 'ماليها', 'قهر', 'كمال الأجسام', 'سينس', 'تشريح', 'اويلي', 'هيروكو', 'بطن', 'كتف', 'حضن', 'اذوب', 'جسم الأنسان', 'وشم', 'اجيب', 'دم', 'حديد', 'يماه', 'جمجمة', 'روكز', 'السكان', 'جميلة', 'مشغول', 'مسافر', 'طيار', 'نود', 'طلع', 'اهلا وسهلا', 'جوري', 'لانا', 'زريبي', 'جاسم', 'فريق', 'قتال', 'أنهار', 'بحار', 'ريم', 'لم يعد', 'هادف', 'دولتي', 'داينستي', 'طماطم', 'خوات', 'تعقب', 'مراقبه', 'ردح', 'هيج', 'دنجور', 'تنحل', 'جبوري', 'انور', 'الحمل', 'الأبراج', 'ذات سرعة', 'ق و ي ة'];
var x2 = ["L e t ' s s e e", 'N e v e r g o n n a c a t c h m e', 'I n f o r m a t i o n', 'م ن م ت ى', 'T h i n g s', 'C o m i n g S o o n', 'O f f i c e', 'I r a q i s o n g', 'H o w', 'M y e y e s', 'B O O M', 'L a s t t i m e', 'S a v e a l l', 'E n c o d e', 'R e n a m e', 'C l o s e', 'S a v e a s', 'O p e n f i l e', 'M i d d l e - E a s t', 'D e k t a t o r', 'D s t o r', 'M i s s i n g', 'M u s i c', 'S o n g s', 'x x 7 m o o d', 'O n m y h e a d', 'F i r e', 'f o r s e l l', 'S c o r e b o a r d', 'T w i t t e r', 'F a c e b o o k', 'S e a r c h', 'L 3 b B o t', 'C h a t t i n g', 'S w a l f', 'K i s s', 'A y w h', 'M i n e c r a f t', 'F o r t n i t e', 'Plugins', 'h a r d w o r k', 'R u n n i n g', 'u n d e f i n e d', 'I k n o w y o u', 'F a s t t y p i n g', 'S o m e t h i n g', 'e v e r y o n e', 'e v e r y d a y', 'w a i t p l e a s e', 'N o t e s', 'T r u t h', 'm y o l d', 'E d i t', 'E n c o d i n g', 'V i e w', 'M a c r o', 'L a n g u a g e', 'T o o l s', 'S e t t i n g s', 'L o v e', 'b e h u m a n', 'H e e e', 'S o o n', 'B o y f r i e n d', 'G i r l f r i e n d', 'i k n o w y o u l e a v e m e a l o n e', 'H a p p y', 'S A D', 'V e r b', 'H u m a n s', 'R . I . P X X X T e n t a c t i o n', 'S o u l', 'c o m e o n', 'U n i t', 'A u t o', 'B r o a d c a s t', 'f o r e v e r', 'C o n n e c t i o n s', 'F i r s t', 'T h e H i v e', 'H y p i x e l', 'L o b b y', 'A S M R', 'A m a n h', 'a g e', 'o l d', 'l o v e m e', 'I m i s s y o u', 'Y e a r s', 'H o u r s', 'S e c o n d s', 'F a k e', 'M y s o u l', 'T e a m S p e a k', 'J o w a n a', 'A b d u l l ah', 'D j', 'N i g h t', 'D a n c e r', 'E i g h t', 'L o s e r', 'S n o w W h i t e', 'L o v e l y', 'T h e B e a t z', 'Beatz', 'B e a t s', 'B e c a r e f u l l', 'و ي ا ي', 'ا ش و ا', 'غ ي ا ب', 'ن و م', 'م ل ف ا ت', 'ع ي س ى', 'م ل ا ي ي ن', 'ح ل و ي ن', 'ا ل م ص ل ا و ي', 'ش م س', 'ع ا د ل أ م ا م', 'خ ص ر', 'ض غ ط', 'س ك ر', 'ج ب ا ل', 'ق ط ر ي ا ع س ل', 'ا ل ت ش غ ي ل ا ل ت ل ق ا ئ ي', 'ه ل ا و م ي ة ه ل ا', 'ا ل أ و ل و ا ل أ خ ي ر', 'ض ا ي ج', 'ص ب ر', 'ع ي و ن ي', 'ح ب ه', 'ه م ه م', 'ا ح ز ا ن', 'ا ح س ا س ي و ي ا ك م', 'ب ع د ق ل ب ي', 'ع ن د ي ت س و ى ك و ن', 'أ ك ت ف ى', 'S t r o n g', 'ق و ي', 'و ا ف و ي ا', 'ك و ج ا', 'م ا ج ن ز ة', 'م ص ع ب', 'ع ب د ا ل ل ه ا ل ع ي س ى', 'ب ا ء', 'ه ل ا ب ا ل خ م ي س', 'و ي و و ي', 'م ط و ع', 'ن و ر ا ل ز ي ن', 'أ س ا م ة', 'ل ي ث', 'د ك ت و ر', 'ا ل ح ي ا ة آ م ل', 'ل ا ي د و م', 'و ا ح د و ر ا ا ل ث ا ن ي', 'م ا ل ي ه ا', 'ق ه ر', 'ك م ا ل ا ل أ ج س ا م', 'س ي ن س', 'ت ش ر ي ح', 'ا و ي ل ي', 'ه ي ر و ك و', 'ب ط ن', 'ك ت ف', 'ح ض ن', 'ا ذ و ب', 'ج س م ا ل أ ن س ا ن', 'و ش م', 'ا ج ي ب', 'د م', 'ح د ي د', 'ي م ا ه', 'ج م ج م ة', 'ر و ك ز', 'ا ل س ك ا ن', 'ج م ي ل ة', 'م ش غ و ل', 'م س ا ف ر', 'ط ي ا ر', 'ن و د', 'ط ل ع', 'ا ه ل ا و س ه ل ا', 'ج و ر ي', 'ل ا ن ا', 'ز ر ي ب ي', 'ج ا س م', 'ف ر ي ق', 'ق ت ا ل', 'أ ن ه ا ر', 'ب ح ا ر', 'ر ي م', 'ل م ي ع د', 'ه ا د ف', 'د و ل ت ي', 'د ا ي ن س ت ي', 'ط م ا ط م', 'خ و ا ت', 'ت ع ق ب', 'م ر ا ق ب ه', 'ر د ح', 'ه ي ج', 'د ن ج و ر', 'ت ن ح ل', 'ج ب و ر ي', 'ا ن و ر', 'ا ل ح م ل', 'ا ل أ ب ر ا ج', 'ذ ا ت س ر ع ة', 'ق و ي ة'];
  	var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Spelling | فكك ✦")
.setFooter("لديك 12 ثانية للأجابة")
.setColor('AQUA')
.setDescription('**♯ ' + x[x3] + ' **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 12000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(async () => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
         // await runGlobalPoints(message.author.id, 0)
         //  await runPoints(message.author.id, message.guild.id, 0)
        // await winOrLose(message.author.id, false)
        var failed = new Discord.RichEmbed()
		.setAuthor("✦ Spelling | فكك ✦")
        .setDescription('أنتهى الوقت ولم يقم أحد في الأجابة :sob:')
        .setColor('#c93f3f')
		.setFooter("-1 Points | +1 Loses")
        return message.channel.send(failed)
            })

      r.then(async (collected)=> {
		  var winner = new Discord.RichEmbed()
		  		.setAuthor("✦ Spelling | فكك ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+4 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 4;
          // await runGlobalPoints(won.id, 0)
          // await runPoints(won.id, message.guild.id, 0)
          // await winOrLose(won.id, true)
                })
      })
  }
})


client.on('message', message => {
  if (message.content.startsWith(prefix + 'سرعه')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;

	var x = ['حادثة', 'مقتل', 'جثة', 'سريع المشي', 'زي ألوان', 'افلام هندية', 'رتب', 'الدول العربية', 'جمهورية', 'حياتي', 'أقتصاد', 'زراعة', 'ماستر شيف', 'جنيور ماستر شيف', 'فورت نايت', 'ماين كرافت', 'بلاك سكواد', 'بلادايس', 'أفريقيا', 'الهنود الحمر', 'غنيوه', 'حليوه', 'استحي على وجهك', 'لن تقودي', 'تقى', 'صغير', 'كبير', 'متوسط', 'فكك', 'هورايزون', 'حليب وقشطة', 'صافي يالبن', 'البريد الالكتروني', 'العنوان', 'الفئة', 'موسيقى', 'أسترخاء', 'السادة', 'كوم بي', 'أخوات', 'القدس', 'تصونون', 'سيرفر', 'كما تدين تدان', 'تدور الدنيا', 'خلى دمي يفور', 'نسى الوقفات', 'لحظة', 'بذات', 'صعبت علي', 'حصل', 'محمي', 'حماية', 'تجميد', 'جيل الطيبين', 'ستايل', 'بقلبي حسره', 'باريس', 'فرنسي', 'عشرة عمر', 'الباب', 'احباب', 'حساب', 'زماني', 'لون الاسود', 'هاخوتي ها', 'يولد يولد', 'مراهن عليك', 'اجيبك للدرب قتلك اجيبك', 'طلع كذاب', 'شغل صعب', 'كاظم الساهر', 'مزاجك', 'رمشي', 'لغاد', 'نادر', 'مميز', 'أسطوري', 'تيم سبيك', 'فلو', 'جلادين', 'يلعن ابو الايام الي خلتني احتاجك', 'اسهر كنت وينام', 'أعز الناس', 'عمري وحياتي', 'افديك', 'يلعن ابو الايام', 'الي قلي', 'وينه', 'معلومات', 'خلفيات', 'صور', 'فيديوهات', 'مقاطع فيديو', 'يوتيوب', 'يوتيوبرز', 'مشعان', 'فلافل', 'اكسس', 'داتا', 'بيانات', 'تعديل البيانات', 'جافا سكربت', 'نار', 'هل تعلم', 'حقائق', 'أكتشاف', 'وقتك', 'منبه', 'تحذير', 'انتباه', 'سيف المعرفة', 'عاصي الحلاني', 'سرور', 'فرح يوم', 'قلادة', 'قاتلني', 'متهني', 'نام', 'حبيبي', 'شبلول', 'رؤية العالم', 'لغات العالم', 'عرعر', 'منفذ حدودي', 'نوافذ', 'بلوقنات', 'بوتي', 'برود كاست', 'طقو طبول', 'طبول', 'عمي', 'سريع', 'فاست', 'لحوم', 'دجاج', 'كباب', 'عصائر', 'عبيد', 'سجاده', 'ردح', 'طرب', 'قم به وخذ البطولة', 'صباح الخير', 'غيري', 'لقى.غيري', 'احضاني', 'أرقام', 'جاسم.طلجني', 'محب ثاني', 'بصيح', 'ورقت', 'ضيعت', 'خلصت', 'نوت باد', 'يكرشه', 'يدبه', 'اندومي', 'راندوملي', 'تلقائي', 'اكواد', 'افتار', 'يومي حلو', 'فرح', 'الرابعة', 'فد مرة', 'عمري', 'حسره', 'متعوب', 'البشير', 'عصائر.اهل.المص', 'باجة', 'ملاهي', 'رقص', 'دانس', 'نوتس', 'دقات', 'البرازيل', 'امريكا', 'طيران', 'خطوط', 'حرج', 'جرحي', 'مثل وني', 'انا الونيت', 'يا الله', 'احبني موت', 'عبدالله', 'عش سالماً', 'الموصل', 'نازحين', 'مطوعين', 'يحرمون', 'اغانينا', 'حاسدينا', 'اهواا', 'هيوا هيوا', 'قرماطيط', 'قرنابيط', 'امطار', 'مطر', 'سماء', 'الهواء', 'همعته', 'مهما', 'قاسي', 'كذا', 'سيبوني', 'سجين', 'بيدي', 'السجن', 'حكمت المحكمة', 'دوابر', 'مهال', 'حبل الكذب قصير', 'ليل', 'نهاري', 'ويل', 'تحقيق', 'أيسان', 'شرير', 'نار وشرار', 'فحم', 'العين', 'كبير', 'بلم', 'تفكيك', 'سرعه', 'لعب', 'لعب بوت', 'بوت', 'يوميا', 'رياضة', 'أكسبورت', 'أنهار', 'أضافة', 'رجال الاعمال', 'سكيورتي', 'حماية', 'الملف', 'تعديل', 'بحث', 'رؤية', 'اللغة', 'نافذة', 'ماكرو', 'الأعدادات', 'خندق', 'الكون', 'الشمس', 'الطلع', 'الحويصلة الهوائية', 'خسارة', 'قيم اوفر', 'ميوزك', 'برو', 'أس جي', 'سباون', 'رام', 'هارد', 'ذهبت', 'شوية', 'ركض', 'بوينتس', 'الكهرباء', 'اسود', 'ضياع', 'وهم', 'احم', 'جبال', 'جمل', 'جميل', 'قائد', 'زمردة', 'اكشن', 'محمد', 'عبدالرحمن', 'حرمة', 'هلا', 'الناس', 'جميل', 'مزه', 'ابشركم', 'ديجي', 'فالون', 'بلايك', 'كرستال', 'اندريس', 'توماس', 'عيسى', 'انا مسلم', 'سرعه', 'طبول', 'راندوم', 'تيم سبيك', 'قوتي', 'حديد', 'سيف', 'ئلو', 'افتتاح', 'لعب بوت', 'استخبارات', 'مستر', 'سيدي', 'الحالة', 'النقاط', 'ستاتس', 'سائق', 'مركبة', 'الفضاء', 'سجين', 'بيدي', 'السجن', 'حكمت المحكمة', 'دوابر', 'مهال', 'حبل الكذب قصير', 'ليل', 'نهاري', 'ويل', 'تحقيق', 'أيسان', 'شرير', 'نار وشرار', 'فحم', 'العين', 'كبير', 'بلم', 'تفكيك', 'سرعه', 'لعب', 'لعب بوت', 'بوت', 'يوميا', 'رياضة', 'أكسبورت', 'أنهار', 'أضافة', 'رجال الاعمال', 'سكيورتي', 'حماية', 'الملف', 'تعديل', 'بحث', 'رؤية', 'اللغة', 'نافذة', 'ماكرو', 'الأعدادات', 'خندق', 'الكون', 'الشمس', 'الطلع', 'الحويصلة الهوائية', 'خسارة', 'قيم اوفر', 'ميوزك', 'برو', 'أس جي', 'سباون', 'رام', 'هارد', 'ذهبت', 'شوية', 'ركض', 'بوينتس', 'الكهرباء', 'اسود', 'ضياع', 'وهم', 'احم', 'جبال', 'جمل', 'جميل', 'قائد', 'زمردة', 'اكشن', 'محمد', 'عبدالرحمن', 'حرمة', 'هلا', 'الناس', 'جميل', 'مزه', 'ابشركم', 'ديجي', 'فالون', 'بلايك', 'كرستال', 'اندريس', 'توماس', 'عيسى', 'انا مسلم', 'سرعه', 'طبول', 'راندوم', 'تيم سبيك', 'قوتي', 'حديد', 'سيف', 'ئلو', 'افتتاح', 'لعب بوت', 'استخبارات', 'مستر', 'سيدي', 'الحالة', 'النقاط', 'ستاتس', 'سائق', 'مركبة', 'الفضاء'];
	var x2 = ['حادثة', 'مقتل', 'جثة', 'سريع المشي', 'زي ألوان', 'افلام هندية', 'رتب', 'الدول العربية', 'جمهورية', 'حياتي', 'أقتصاد', 'زراعة', 'ماستر شيف', 'جنيور ماستر شيف', 'فورت نايت', 'ماين كرافت', 'بلاك سكواد', 'بلادايس', 'أفريقيا', 'الهنود الحمر', 'غنيوه', 'حليوه', 'استحي على وجهك', 'لن تقودي', 'تقى', 'صغير', 'كبير', 'متوسط', 'فكك', 'هورايزون', 'حليب وقشطة', 'صافي يالبن', 'البريد الالكتروني', 'العنوان', 'الفئة', 'موسيقى', 'أسترخاء', 'السادة', 'كوم بي', 'أخوات', 'القدس', 'تصونون', 'سيرفر', 'كما تدين تدان', 'تدور الدنيا', 'خلى دمي يفور', 'نسى الوقفات', 'لحظة', 'بذات', 'صعبت علي', 'حصل', 'محمي', 'حماية', 'تجميد', 'جيل الطيبين', 'ستايل', 'بقلبي حسره', 'باريس', 'فرنسي', 'عشرة عمر', 'الباب', 'احباب', 'حساب', 'زماني', 'لون الاسود', 'هاخوتي ها', 'يولد يولد', 'مراهن عليك', 'اجيبك للدرب قتلك اجيبك', 'طلع كذاب', 'شغل صعب', 'كاظم الساهر', 'مزاجك', 'رمشي', 'لغاد', 'نادر', 'مميز', 'أسطوري', 'تيم سبيك', 'فلو', 'جلادين', 'يلعن ابو الايام الي خلتني احتاجك', 'اسهر كنت وينام', 'أعز الناس', 'عمري وحياتي', 'افديك', 'يلعن ابو الايام', 'الي قلي', 'وينه', 'معلومات', 'خلفيات', 'صور', 'فيديوهات', 'مقاطع فيديو', 'يوتيوب', 'يوتيوبرز', 'مشعان', 'فلافل', 'اكسس', 'داتا', 'بيانات', 'تعديل البيانات', 'جافا سكربت', 'نار', 'هل تعلم', 'حقائق', 'أكتشاف', 'وقتك', 'منبه', 'تحذير', 'انتباه', 'سيف المعرفة', 'عاصي الحلاني', 'سرور', 'فرح يوم', 'قلادة', 'قاتلني', 'متهني', 'نام', 'حبيبي', 'شبلول', 'رؤية العالم', 'لغات العالم', 'عرعر', 'منفذ حدودي', 'نوافذ', 'بلوقنات', 'بوتي', 'برود كاست', 'طقو طبول', 'طبول', 'عمي', 'سريع', 'فاست', 'لحوم', 'دجاج', 'كباب', 'عصائر', 'عبيد', 'سجاده', 'ردح', 'طرب', 'قم به وخذ البطولة', 'صباح الخير', 'غيري', 'لقى.غيري', 'احضاني', 'أرقام', 'جاسم طلجني', 'محب ثاني', 'بصيح', 'ورقت', 'ضيعت', 'خلصت', 'نوت باد', 'يكرشه', 'يدبه', 'اندومي', 'راندوملي', 'تلقائي', 'اكواد', 'افتار', 'يومي حلو', 'فرح', 'الرابعة', 'فد مرة', 'عمري', 'حسره', 'متعوب', 'البشير', 'عصائر اهل المص', 'باجة', 'ملاهي', 'رقص', 'دانس', 'نوتس', 'دقات', 'البرازيل', 'امريكا', 'طيران', 'خطوط', 'حرج', 'جرحي', 'مثل وني', 'انا الونيت', 'يا الله', 'احبني موت', 'عبدالله', 'عش سالماً', 'الموصل', 'نازحين', 'مطوعين', 'يحرمون', 'اغانينا', 'حاسدينا', 'اهواا', 'هيوا هيوا', 'قرماطيط', 'قرنابيط', 'امطار', 'مطر', 'سماء', 'الهواء', 'همعته', 'مهما', 'قاسي', 'كذا', 'سيبوني', 'سجين', 'بيدي', 'السجن', 'حكمت المحكمة', 'دوابر', 'مهال', 'حبل الكذب قصير', 'ليل', 'نهاري', 'ويل', 'تحقيق', 'أيسان', 'شرير', 'نار وشرار', 'فحم', 'العين', 'كبير', 'بلم', 'تفكيك', 'سرعه', 'لعب', 'لعب بوت', 'بوت', 'يوميا', 'رياضة', 'أكسبورت', 'أنهار', 'أضافة', 'رجال الاعمال', 'سكيورتي', 'حماية', 'الملف', 'تعديل', 'بحث', 'رؤية', 'اللغة', 'نافذة', 'ماكرو', 'الأعدادات', 'خندق', 'الكون', 'الشمس', 'الطلع', 'الحويصلة الهوائية', 'خسارة', 'قيم اوفر', 'ميوزك', 'برو', 'أس جي', 'سباون', 'رام', 'هارد', 'ذهبت', 'شوية', 'ركض', 'بوينتس', 'الكهرباء', 'اسود', 'ضياع', 'وهم', 'احم', 'جبال', 'جمل', 'جميل', 'قائد', 'زمردة', 'اكشن', 'محمد', 'عبدالرحمن', 'حرمة', 'هلا', 'الناس', 'جميل', 'مزه', 'ابشركم', 'ديجي', 'فالون', 'بلايك', 'كرستال', 'اندريس', 'توماس', 'عيسى', 'انا مسلم', 'سرعه', 'طبول', 'راندوم', 'تيم سبيك', 'قوتي', 'حديد', 'سيف', 'ئلو', 'افتتاح', 'لعب بوت', 'استخبارات', 'مستر', 'سيدي', 'الحالة', 'النقاط', 'ستاتس', 'سائق', 'مركبة', 'الفضاء', 'سجين', 'بيدي', 'السجن', 'حكمت المحكمة', 'دوابر', 'مهال', 'حبل الكذب قصير', 'ليل', 'نهاري', 'ويل', 'تحقيق', 'أيسان', 'شرير', 'نار وشرار', 'فحم', 'العين', 'كبير', 'بلم', 'تفكيك', 'سرعه', 'لعب', 'لعب بوت', 'بوت', 'يوميا', 'رياضة', 'أكسبورت', 'أنهار', 'أضافة', 'رجال الاعمال', 'سكيورتي', 'حماية', 'الملف', 'تعديل', 'بحث', 'رؤية', 'اللغة', 'نافذة', 'ماكرو', 'الأعدادات', 'خندق', 'الكون', 'الشمس', 'الطلع', 'الحويصلة الهوائية', 'خسارة', 'قيم اوفر', 'ميوزك', 'برو', 'أس جي', 'سباون', 'رام', 'هارد', 'ذهبت', 'شوية', 'ركض', 'بوينتس', 'الكهرباء', 'اسود', 'ضياع', 'وهم', 'احم', 'جبال', 'جمل', 'جميل', 'قائد', 'زمردة', 'اكشن', 'محمد', 'عبدالرحمن', 'حرمة', 'هلا', 'الناس', 'جميل', 'مزه', 'ابشركم', 'ديجي', 'فالون', 'بلايك', 'كرستال', 'اندريس', 'توماس', 'عيسى', 'انا مسلم', 'سرعه', 'طبول', 'راندوم', 'تيم سبيك', 'قوتي', 'حديد', 'سيف', 'ئلو', 'افتتاح', 'لعب بوت', 'استخبارات', 'مستر', 'سيدي', 'الحالة', 'النقاط', 'ستاتس', 'سائق', 'مركبة', 'الفضاء'];
	var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Fast Typing | أسرع كتابة ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('AQUA')
.setDescription('**→ ' + x[x3] + ' **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 11000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        var failed = new Discord.RichEmbed()
.setAuthor("✦ Fast Typing | أسرع كتابة ✦")
        .setDescription('أنتهى الوقت ولم يقم أحد في الأجابة :sob:')
        .setColor('#c93f3f')
		.setFooter("-1 Points | +1 Loses")
        return message.channel.send(failed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
.setAuthor("✦ Fast Typing | أسرع كتابة ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+2 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 2;
                })
      })
  }
})

client.on('message', message => {
  if (message.content.startsWith(prefix + 'لغز')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;


    var l3z = new Discord.RichEmbed()

	var x = ['ما هو الشي الذي له أربع أرجل و لا يستطيع المشي؟', 'ما هو الشي الذي إذا وضعته في الثلاجة شهرا كاملا لا يبرد؟', 'ما هو الحيوان الذي إذا قطعناه نصفين لا يموت؟', 'ما هو حامل و محمول , يابس و مبلول', ' ما هو الشي الذي يمشي و يقف و ليس له أرجل', 'أخت خالك و ليست خالتك من تكون ؟', 'ما هو الشي الذي له أسنان و لا يعض؟؟', 'ما هو الشي الذي تراه في الليل ثلاث مرات و في النهار مرة وحدة؟؟', 'ما هو الشي الذي لا يجري و لا يمشي ؟', 'ما هو الباب الذي لا يمكن فتحه ؟ ', 'ما هو إسم الشهر الميلادي الذي إذا حذفت أوله , تحول إلى إسم فاكهه ؟', 'ما هو الشي الذي تذبحه و تبكي عليه ؟', 'ما هو الشي الذي يخترق الزجاج ولا يكسره ؟', 'ما هو الشي الذي لا يدخل الإ إذا ضرب على رأسه ؟', ' ما هو الشي الذي اسمه على لونه ؟', 'ما هو الشي الذي كلما زاد نقص ؟', 'ما هو الشي الذي يتكلم جميع لغات العالم ؟', 'ما هو الشي الذي كلما أخذت منه كبر ؟', 'ما هو أهون موجود و أعز مفقود ؟', 'ما هي التي تحرق نفسها لتفيد غيرها ؟', 'هو ابن الماء . وإذا وضع فيه الماء مات ... فماذا يكون ؟', 'من هو الذي ينام مرتديا حذاءه لا يفارقه ؟', 'ما هو الجرح الذي لا ينزف دما ؟', 'ما هو القفص الذي لا يحبس فيه حيوان أو طير ؟', 'كله ثقوب و مع ذلك يحفظ الماء ؟', 'لها رقبه و ليس لها رأس .. فماهي ؟', 'ما هو الذي يهز رأسه و هو يصعد التل ؟', 'ما هو الذي لحمه من الداخل و عظمه من الخارج ؟', 'ما هو الشي الذي يعتبر غير نظيف اذا ابيض لونه ؟', 'ما هو الشي الذي تسمعه و لا تراه و إذا رأيته لا تسمعه ؟', 'ما هو الطائر الذي يرى بإذنيه ؟', 'ما هو الشي الذي يدخل مبلولا و يخرج ناشفا ؟', 'ما هو الشي الذي له أسنان ولا يعض ؟', 'ما هي التي ترى كل شي وليس لها عيون ؟', 'ولده في بطنه يدقه ويلكمه ، وقد ارتفع صياحه ولا حصل من يرحمه .. فما هو ؟', 'ما هو الشي الذي في رأسه سبع فتحات؟', 'من هي بنت خال بنت والدك ؟ ', ' إذا دخل الماء لم يبتل ؟', 'ما هو الذي يلف حول الغرفه دون أن يتحرك ؟', 'ما هي حاسة الشم عند الثعبان ؟', 'منوع من الحديد والكل بحكمه راضي ؟', ' لمن ينحني الإمبراطور رأسه ؟', ' من هو الذي مات و لم يولد ؟', 'بحركه من إصبعك يحدثك بكل لسان .. فما هو ؟ ', 'تضرب بلا سبب .. و تطير بلا جناح .. و تسبب الفرح و الغضب .. فما هي ؟', 'من هو الذي تراه ولا يراك ؟', 'من هو الشيء الذي يمكله جميع البشر بأستثناء سيدنآ ادم؟']
	var x2 = ['الكرسي', 'الفلفل', 'دودة الأرض', 'القارب', 'الساعة', 'امك', 'المشط', 'حرف اللام', 'الماء', 'الباب المفتوح', 'تموز', 'البصل', 'الضوء', 'المسمار', 'اللون', 'العمر', 'الصدى', 'الحفرة', 'الماء', 'الشمعه', 'الثلج', 'الحصان', 'جرح الشعور', 'القفص الصدري', 'الأسفنج', 'الزجاجة', 'الحصان', 'السلحفاة', 'اللسان', 'الطلقات النارية', 'الخفاش', 'الخبز', 'المشط', 'المرآة', 'النجر', 'الأنسان', 'اختك', 'الضوء', 'الحائط', 'اللسان', 'الميزان', 'للحلاق', 'آدم', 'المذياع', 'الكرة', 'الكفيف', 'السرة']
   var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ Puzzle | لغز ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('BLUE')
.setDescription('**→ ' + x[x3] + ' **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 10000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        var failed = new Discord.RichEmbed()
.setAuthor("✦ Puzzle | لغز ✦")
        .setDescription('** :negative_squared_cross_mark:  | أنتهى الوقت ولم يقم احد بلأجابة الجواب الصحيح هو `' + x2[x3] +'`**')
        .setColor('#c93f3f')
		.setFooter("-1 Points | +1 Loses")
        return message.channel.send(failed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
.setAuthor("✦ Puzzle | لغز ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+5 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 5;
                })
      })
  }
})


client.on('message', message => {
  if (message.content.startsWith(prefix + 'سؤال')) {

		games[message.author.id].total += 1;

    if(!message.channel.guild) return;


    var x = ['ماهو ناتج 45 + 69؟', 'ماهي الرتبة التي يندرج منها الأسد؟', 'كم كيلو متراً يبلغ الحدود الفاصلة بين الصين ومنغوليا؟', 'ماهو النوع من العلوم الذي يتعامل مع الخرائط؟', 'ماذا يسمى الحجر الصغير؟', 'ماهي الدولة التي أحرزت على أكثر عدد ميداليات الذهبية في ألعاب الأولمبياد الشتوية لعام 2006؟', 'كم عدد فصول أوبرا كارمن التي قام بها المؤلف الموسيقي الشهير جورج بيزيه؟', 'volleyball ما معنى كلمة', 'ماهي جنسية المؤلف الموسيقى جاكومو بوتشيني', 'ماهي السورة الملقبة بعروس القرآن؟', 'كم عدد أرجل 4 أحصنة؟', 'من هو رامي رمزي؟', 'من هو طه حسين؟', 'يخزن السكر في الجسم على شكل...؟', 'كم عدد المباريات التي خسرها محمد علي كلاي؟', 'ماعلى الارض من مرتفعات ومنخفضات هي؟', 'ماكان أول حيوان يصعد ألى الفضاء؟', 'كم عدد الدول في مجلس الوحدة الاقتصادية العربية؟', 'مصطفى كمال أتاتورك كان أول رئيس في دولة....؟', 'كم سنة يعيش الجمل؟', 'في أي سنة نالت دولة قطر على أستقلالها عن أنجلترا', 'من هما مؤسسين شركة ديزني الشهيرة؟', 'ماناتج خلط اللونين الازرق والاصفر؟', 'متى ولد النجم والاعب المصري المعتزل محمد ابو تريكة؟', 'ماهو الحزب السياسي الذي اتبعة الرئيس الامريكي بنجامين هاريسون؟', 'ماذا تسمى البودرة الموجودة في الزهور والتي يجمعها النحل من كافة الازهار؟', 'متى تم تأسيس قناة طيور الجنة؟', 'كم يبلغ معدل ضربات قلب الطفل في الدقيقة؟', 'من هو الذي وضع علم الجبر؟', 'ماهو الشيء الموجود في القرن مرة وفي الدقيقة مرتين؟', 'ماهي اللعبة التي تعتمد على التفكير؟', 'ماهو ترتيب الخليفة العثماني سليمان القانوني؟', 'ماهو اللون الذي ينتج من مزج لون الاصفر والاحمر', 'ماهو لون علم المملكة العربية السعودية؟', 'ماهي جنسية الفنان صابر الرباعي؟', 'ماهي مدة نوم الانسان الصحيحة؟', 'متى اطلق مهجران دبي للتسوق لأول مرة؟', 'ماهو الترتيب الذي تحتله ولاية مينيوسوتا من حيث المساحة بين الولايات المتحدة الأمريكية', 'في لعبه سودو كو, كم عدد المربعات الصغيرة التي يجب ان تنبغي على ارقام من اجل انهاء اللعبة؟', 'ماهي عاصمة البرازيل؟', 'ما أسم صغير الضب؟', 'مامعنى اسم اسبانيا؟', 'من هو الذي جمع الناس في التراويح', 'كم عدد السور المكية؟', 'قطعة من النسيج تستخدم لحجب الضوء ؟', 'ماهو الشي الذي يملكه جميع البشر بأستثناء سيدنا آدم؟', 'سفير الأغنية العراقية و قيصر الأغنية العربية ؟', 'ماركة عالمية إشتهرت بعلامة الصح ؟', 'من هو الفنان الذي غنى أغنية "قلب قلب" ؟', 'ما الدولة الافريقية التي عاصمتها زامبيا ؟', 'مغني وراقص امريكي لقب بملك البوب ؟', 'ما الشيء الذي إذا لمسته صاح ؟', 'لعبة تلعب بالعصا لضرب كرات ؟', 'طائر يلد ولا يبيض؟', 'ماهو الباب الذي لايفتح؟', 'من هم الذين اخترعوا الكتابة؟','متى أصدر اول فيديو على موقع يوتيوب؟', 'من هو  عالم وعبقري الرياضيات؟', 'ماهي القناة العربية التي أشتهرت  بلمعلومات العامة والغريبة؟', 'ماهي الوسيلة لحمل البظائع والانسان فوق الماء؟', 'شيء يستعمل مع القهوة؟', 'برنامج عربي اشتهر بمقابلة المشاهير تحديداً في الكويت؟', 'في أي سنة نحن الآن؟', 'ما هو الوعاء الذي يحمل الدم من القلب إلى أجزاء الجسم ؟', 'ماهي لغة النمسا؟', 'مكان صمم من قبل الانسان ذو جدران وسقف وارضية ؟', 'ماهي الدولة العربية الملقبة بأم الدنيا؟', 'ماهو الشيء المرسوم على شعار شركة آبل؟', 'لاعب يُلقب بالقناص - الكاسر ؟', 'أكثر سورة ورد فيها أسم مريم هي سورة...؟ ', 'ما هي مدينة التلال السبع؟', 'ما اسم صغير الضب؟', 'كم عدد السور المدنية؟']
     var x2 = ['114', 'اللواحم', '4677', 'كارتوغرافي', 'حصى', 'المانيا', '4', 'الكرة الطائرة', 'ايطالي', 'الرحمن', '16', 'ممثل', 'كاتب', 'الغليكوجين', '5', 'تضاريس', 'كلب', '10', 'تركيا', '25', '1971', 'والت وروي ديزني', 'اخضر', '1978', 'جمهوري', 'حبوب اللقاح', '2006', '85', 'الخوارزمي', 'حرف القاف', 'الشطرنج', '10', 'البرتقالي', 'اخضر', 'تونسي', '8 ساعات', '1996', '12', '81', 'برازيليا', 'حسل', 'بلد الأرانب', 'عمر بن الخطاب', '86', 'الستارة', 'السرة', 'كاظم الساهر', 'نايك', 'محمد السالم', 'لوكاسا', 'مايكل جاكسون', 'الجرس', 'بلياردو', 'الوطواط', 'الباب المفتوح', 'السومريون', '2006', 'البرت اينشتاين', 'هل تعلم', 'السفينة', 'الهيل', 'سوار شعيب', '2018', 'الشريان', 'الالمانية', 'البيت', 'مصر', 'تفاحة', 'ياسر القحطاني', 'المائدة', 'روما', 'حسل', '86']
     var x3 = Math.floor(Math.random()*x.length)
	   var embed = new Discord.RichEmbed()
.setAuthor("✦ General Questions | اسأله عامة ✦")
.setFooter("لديك 10 ثواني للأجابة")
.setColor('PINK')
.setDescription('**→ ' + x[x3] + ' **')
message.channel.send(embed).then(msg1 => {
             var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
             thing: true,
             maxMatches : 1,
              time : 10000,
               maxUses: 1,
              errors : ['time']
          })
      r.catch(() => {
        games[message.author.id].loses += 1
        games[message.author.id].points -= 1;
        var failed = new Discord.RichEmbed()
.setAuthor("✦ General Questions | اسأله عامة ✦")
        .setDescription('** :negative_squared_cross_mark:  | أنتهى الوقت ولم يقم احد بلأجابة الجواب الصحيح هو `' + x2[x3] +'`**')
        .setColor('#c93f3f')
		.setFooter("-1 Points | +1 Loses")
        return message.channel.send(failed)
            })

      r.then((collected)=> {
		  var winner = new Discord.RichEmbed()
.setAuthor("✦ General Questions | اسأله عامة ✦")
        .setDescription(`**${collected.first().author}**` + ':gift: اجابة صحيحة')
        .setColor('GREEN')
		.setFooter("+8 Point | +1 Wins")
           message.channel.send(winner)
           let won = collected.first().author;
           games[won.id].wins += 1
           games[won.id].points += 8;
                })
      })
  }
})


//admin

const child_process = require("child_process");
const adminprefix = "$";
const devs = ['449313863494664214', '228401267263668224'];

client.on('message', message => {
if(message.content === adminprefix + "restart") {
      if (!devs.includes(message.author.id)) return;
          message.channel.send(`⚠️ **Restarting the bot..**`);
        console.log(`⚠️ جاري اعادة تشغيل البوت... ⚠️`);
        client.destroy();
        child_process.fork(__dirname + "/PlayBot.js");
        console.log(`تم اعادة تشغيل البوت`);
    }

  });


client.on('message', (msg) => {
  if(msg.author.bot) return;

  if(msg.content.startsWith(prefix + 'points')) {

    var mentions = msg.mentions.users.first();

    var member;
    if(!mentions) {
      member = msg.author
    } else {
      member = msg.mentions.users.first();
    }

    var points = games[member.id].points
    var wins = games[member.id].wins
    var losses = games[member.id].loses

    const pointsEmbed = new Discord.RichEmbed()
    .setAuthor('◀ لعب بوت | PlayBot ▶', client.user.avatarURL)
	.setColor("AQUA")
    .addField('`عدد النقاط`', `**${points} :sparkles:**`, true)
    .addField('`عدد مرات الفوز`', `**${wins} :fire:**`, true)
    .addField('`عدد مرات الخسارة`', `**${losses} :octagonal_sign:**`, true)
    .setFooter(`${member.username}'s Points`, member.displayAvatarURL)

    if(!mentions) {
      pointsEmbed.setDescription('**➤ احصائياتك.**')
    } else {
      pointsEmbed.setDescription(`**➤ أحصائيات ${mentions}**`)
    }

    msg.channel.send("", {
      embed: pointsEmbed
    })
  }
})



	client.on('message', msg => {
if(msg.content === prefix + 'ping') {
msg.channel.send('**Pong :` ' + `${client.ping}` + ' `**')
	}
})


	client.login(token)
