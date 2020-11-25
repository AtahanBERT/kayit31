const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);


client.on("ready", () => {
  client.user.setPresence({
    game: { name: `+botekle`, type: "WATCHING" },
    status: "online"
  });
});

client.on("guildMemberAdd", member => {
  let tag = '・'
  member.setNickname(`${tag} ${member.user.username}`);
});

client.on("message", message => {
  let kanal2 = ayarlar.kanalengel2;
  if (message.channel.id == '780513133369622568') {

    message.delete();
  }
});

client.on("message", (message, member) => {
  let kanal1 = ayarlar.kanalengel;
  if (message.channel.id == kanal1) {


    message.delete(1 * 500);
  }
});





client.on("guildMemberAdd", (member) => {
  let embed = new Discord.MessageEmbed()
  .setTitle("<a:pembeh:751553654561046619> __Jau Land'a hoşgeldin!__")
  .setDescription(`
  
» <a:pembeh:751553654561046619> **Öncelikle altyapıları alıp sunucudan çıkan ve bunu tekrarlayan üyeler 2. uyarıdan sonra sunucudan sınırsız yasaklanır.**

» <a:pembeh:751553654561046619> **Paylaştığım herhangi bir altyapıyı kendi adınıza paylaşamazsınız.Bunun için lütfen izin dahi istemeyiniz.**

» <a:pembeh:751553654561046619> **Altyapılara erişmek için <@714141828340777043>'in DM kutusuna aşağıdaki gibi bir ekran görüntüsü atmalısınız.En yakın zamanda rolleriniz verilir.**
  `)
  .setImage('https://cdn.discordapp.com/attachments/768421922622406676/779066552816762901/unknown.png')
member.send(embed)})


client.on("message", async msg => {
  const db = require('quick.db');
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 1) {
    
    db.add(`puan_${msg.author.id + msg.guild.id}`, 3)//mesaj yazınca xp veriyor

};

  if (db.fetch(`puan_${msg.author.id + msg.guild.id}`) > 12) {//150 xp de 1 seviye veriyor
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)//seviye verildi
    

    
    db.delete(`puan_${msg.author.id + msg.guild.id}`)//xp silindi
    
  };
 
  if (db.has(`roll_${msg.guild.id}`) === true) {//rol 
  if (db.has(`rollss_${msg.guild.id}`) === true) {//rol seviye
    

   let rol = ayarlar.levelROL;
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == 2) {
    if (msg.member.roles.cache.has(msg.guild.roles.cache.get(rol)) === false) {
    msg.channel.send(`**<@${msg.author.id}> başarıyla ${db.fetch(`seviye_${msg.author.id + msg.guild.id}`) - 1 || 0} seviyeyi geçtin!**`)
     
    msg.member.roles.add(rol)
    }
  };

}};
  
});



client.on("message", async message => {
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '✅'
    const backwards = message.createReactionCollector(backwardsFilter, { time: 0 });
  let letter = ['a','b','c','d','e','f','g','ğ','h','ı','i','j','k','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z']
    if(message.content.toLowerCase().includes('a','b','c','d','e','f','g','ğ','h','ı','i','j','k','m','n','o','ö','p','r','s','ş','t','u','ü','v','y','z')) return
//  if(message.author.id = client.user.id) return
  let EMBO = new Discord.MessageEmbed().setTimestamp().setAuthor('» Bir Kullanıcı Altyapı İsteğinde Bulundu', message.author.avatarURL()).setDescription(`» **Kullanıcı** ${message.author}`);
  if (message.author.id === client.user.id && message.channel.type === "dm") return;
  if (message.attachments.first()) EMBO.setImage(message.attachments.first().url);

  if (message.channel.type === "dm" || !message.guild) client.channels.cache.get('779066931998883851').send(EMBO);
 
});




const iltifatlar = ['Altyapılara ulaşmak için <#768421922622406676> kanalına bakabilirsiniz'];

var iltifatSayi = 0; 
client.on("message", async message => {
  if(message.channel.id !== "758689889197096990" || message.author.bot) return;
  iltifatSayi++
  if(iltifatSayi >= 40) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
    iltifatSayi = 0;
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    client.channels.cache.get('758689889197096990').send(`**Altyapılara ulaşmak için <#768421922622406676> kanalına bakabilirsiniz**`);
  };
});

client.on("ready", () => {
 client.channels.cache.get('781242727303741462').join()
});


client.on("message", async message => {
  if(!message.content.toLowerCase().includes('altyapı nasıl alırım','altyapıyı nerden alacağım','altyapılar nerede')) return;
let eee = new Discord.MessageEmbed()
.setDescription(`
<a:sari3:751558669585612830> • Altyapılara ulaşnanız için  <@714141828340777043> 'in DM kutusuna hangi altyapıyı istiyorsanız o videoya like atıp kanala abone olduğunuzun ve saatin gözüktüğü bir ekran görüntüsü atmalısınız.

<a:sari3:751558669585612830> •Attıktan sonra en kısa sürede altyapı rolünüz verilir.Sadece fotoğraf atın boş şeyler yazarsanız banlanırsınız.

<a:sari3:751558669585612830> •Örnek Ekran Görüntüsü: (TAMAMEN AYNISI OLMAK ZORUNDA)
                `)
.setImage('https://cdn.discordapp.com/attachments/768421922622406676/779066552816762901/unknown.png')
  message.reply(eee);
  
});



client.on("message", async message => {

    if(message.content.toLowerCase().includes('+public','+altyapı','+botlist'))
      message.delete()
})

 
 client.on('guildMemberAdd',async member => {
 
 let user = client.users.cache.get(member.id);
  let kanal = member.guild.channels.cache.cache.find(x => x.id === '770641495832133644')
 const { get } = require('node-superfetch');
  let moment = require('moment')
  require('moment-duration-format')
  const avatar =member.user.displayAvatarURL()
 const kuruluş = user.createdAt.getTime();
  const tarih = new Date().getTime() - user.createdAt.getTime();
 var tarihi = moment.duration(tarih).format(" D [gün] H [saat] m [dakika] s [saniye]")
  let emb = new Discord.MessageEmbed()
  .setThumbnail(avatar)
  .setDescription(`
» <a:dng:779785918591795231> **SENİNLE BİRLİKTE \`${member.guild.members.cache.size}\` KİŞİYİZ**
» <a:dng:779785918591795231>** İSİM = \`${user.username}\` **
» <a:dng:779785918591795231>** HESAP KURULUŞ TARİHİ = \`${tarihi}\`**`)
  kanal.send(`
»                                          __**H O Ş G E L D İ N**__
» <a:dng:779785918591795231>** KULLANICI = ${member} **
» <a:dng:779785918591795231>** HESAP KURULUŞ TARİHİ = \`${tarihi}\`**
» <a:dng:779785918591795231> **SENİNLE BİRLİKTE \`${member.guild.members.cache.size}\` KİŞİYİZ**
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋`)
 
});
const db = require('quick.db')
client.on("guildMemberRemove", async member => {
let bot1 = db.fetch(`sahip_${member.user.id}`)
const kanal = member.guild.channels.cache.get(x => x.id === "780581274825654292")
let bot = member.guild.members.cache.get(bot1) 
let members = member;
if(members = bot1) {
let sebeb = `${member.user.tag} Adlı Sahip Kullanıcı Sunucudan Ayrıldı İçin.`
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
**<:tr:780484679227932704> »** ${member} Sunucudan Ayrıldı Sistemde Kayıt Bot'u Vardı ve Atıldı!
**<:en:780485586535448616> »** ${member} Left the Server, had a bot registered in the system,bot was kicked.
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
**<:tr:780484679227932704> » Bot Bilgisi | <:en:780485586535448616> » Bot Information ↓ ↓ ↓**

**<:tr:780484679227932704> » Sahip | <:en:780485586535448616> Owner ${member} \`[ ${member.id} ]\`**
**<:tr:780484679227932704> »  Bot  | <:en:780485586535448616> Bot ${bot} \`[ ${bot.id} ]\`**
`)
kanal.send(embed)
bot.kick(sebeb)  
db.delete(`sahip_${member.user.id}`)
}})
