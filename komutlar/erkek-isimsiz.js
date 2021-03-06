const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const emoji = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {

    let erkekROL = ayarlar.erkekROL
    let fakeROL = ayarlar.fakeROL
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG
    let kayıtsayı = db.fetch(`erkek.sayı_${message.author.id}_${message.guild.id}`)
    let tkayıtsayı = db.fetch(`toplam.sayı_${message.author.id}_${message.guild.id}`)
    let kanal = ayarlar.giriskanal;
  
if(message.channel.id !== kanal) return message.react(emoji);

    if(!message.member.roles.cache.has(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bir kişiyi etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, ${args[0]}, kullanıcısını sunucuda bulamıyorum.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
if (kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = `${emoji} Şüpheli`
if (kurulus > 1296000000) kontrol = `${basari} Güvenli`
  

const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL)
message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL);
db.add(`erkek.sayı_${message.author.id}_${message.guild.id}`, +1)
db.add(`toplam.sayı_${message.author.id}_${message.guild.id}`, +1)
  if(ayarlar.erkekICON) {
    let erkekICON = ayarlar.erkekICON
      message.guild.members.cache.get(kullanıcı.id).roles.add(erkekICON)
  }
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).roles.remove(fakeROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Erkek** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
message.react(basari)
let mesaj31 = `> ${kullanıcı} Aramıza Katıldı.`
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
let embed2 = new MessageEmbed()
.setDescription(`
• ${kullanıcı} Aramıza <@&${erkekROL}> Rolleriyle katıldı.

• Kaydı Gerçekleştiren Yetkili
> ${message.author}

• Aramıza Hoş Geldin
> ${kullanıcı}
`)
.setColor('BLACK')
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
.setTimestamp()


client.channels.cache.get(ayarlar.kayıtLOG).send(mesaj31)
await sleep('0500');
client.channels.cache.get(ayarlar.kayıtLOG).send(embed2);
let embed3 = new MessageEmbed()
.setColor('WHITE')

.setDescription(`
• ${kullanıcı} adlı kişinin kaydı başarıyla yapıldı.
• Verilen Roller • <@&${ayarlar.erkekROL}>
• Alınan Roller • <@&${ayarlar.kayıtsızROL}>`)
.setFooter((`Toplam Erkek Kayıt Sayın: ${kayıtsayı ? `${kayıtsayı}` : "0"}`) + (`\nToplam Kayıt Sayın: ${tkayıtsayı ? `${tkayıtsayı}` : "0"}`), message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))

message.channel.send(embed3)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek'
};