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








// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag}` + `${ayarlar.kayitsizad}`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son


// BOT OTOROL

client.on('guildMemberAdd', async member => {
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:planta_carpi:813696920412618752> Bu Kullanıcı **Şüpheli**'
if (tarih > 1296000000) kontrol = '<a:plantatikm:789863491728965662> Bu Kullanıcı **Güvenli**'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
 » • <a:planta_siyahtac:789879331391799306> Hoşgeldin ${member}
    
 » • <a:planta_siyahtac:789879331391799306> Seninle birlikte **${member.guild.memberCount}** kişiyiz.
 
 » • [ **${ayarlar.tag}** ] Tagımızı alarak ekibimize katılabilirsin.
 
 » • <a:planta_siyahtac:789879331391799306> <@&${ayarlar.yetkiliROL}> rolündekiler seninle ilgilenecektir.
 
 » •  ${kontrol} 
 
 » • <a:planta_siyahtac:789879331391799306> Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
 
 » • <a:planta_siyahtac:789879331391799306> Ses teyit odasında kaydınızı yaptırabilirsiniz. 

`)
    .setImage('')
    .setTimestamp()
    
      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)
    
  });
// GİRİŞ SON

client.login(process.env.token);


client.on("ready", async function() {
let voiceChannel = ayarlar.botses;
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
});


client.on("guildCreate", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle(`Yeni Sunucu!`)
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
embed.setColor("RANDOM")

embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
})
client.on("guildDelete", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle("Sunucudan Attılar Piçler")
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
  embed.setColor("RED")
embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
});
