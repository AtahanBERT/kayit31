const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const emoji = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {

    let kadınROL = ayarlar.kadınROL
    let fakeROL = ayarlar.fakeROL
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG
    let kayıtsayı = db.fetch(`kadın.sayı_${message.author.id}_${message.guild.id}`)
    let tkayıtsayı = db.fetch(`toplam.sayı_${message.author.id}_${message.guild.id}`)
    let kanal = ayarlar.giriskanal;
  
if(message.channel.id !== kanal) return message.react(emoji);

    if(!message.member.roles.cache.has(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) 
    return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bir kişiyi etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, ${args[0]}, kullanıcısını sunucuda bulamıyorum.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = `${emoji} Şüpheli`
if (kurulus > 1296000000) kontrol = `${basari} Güvenli`
  
  
  
let isim = args[1]


if(!isim) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Üyenin ismini belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

let yaş = args[2];
if(!yaş) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Üyenin yaşını belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
let tag = ayarlar.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${tag} ${isim} | ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(kadınROL)
message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL)
db.add(`kadın.sayı_${message.author.id}_${message.guild.id}`, +1)
db.add(`toplam.sayı_${message.author.id}_${message.guild.id}`, +1)
  if(ayarlar.kadınICON) {
    let kadınICON = ayarlar.kadınICON
      message.guild.members.cache.get(kullanıcı.id).roles.add(kadınICON)
  }
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).roles.remove(fakeROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Kadın** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
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
• ${kullanıcı} Aramıza <@&${kadınROL}> Rolleriyle katıldı.

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
• İsim Yaş • **${isim} ${yaş}**
• Verilen Roller • <@&${ayarlar.kadınROL}>
• Alınan Roller • <@&${ayarlar.kayıtsızROL}>
`)
.setFooter((`Toplam Kadın Kayıt Sayın: ${kayıtsayı ? `${kayıtsayı}` : "0"}`) + (`\nToplam Kayıt Sayın: ${tkayıtsayı ? `${tkayıtsayı}` : "0"}`), message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(embed3)
db.push(`isim.${message.guild.id}`, {userID: kullanıcı.id, isim: isim, yas: yaş, role: ayarlar.kadınROL})}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
  permLevel: 0
};

exports.help = {
  name: 'kadın'
}