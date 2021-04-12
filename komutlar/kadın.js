const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const emoji = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;

exports.run = async (client, message, args) => {//splashen

    let kadınROL = ayarlar.kadınROL
    let fakeROL = ayarlar.fakeROL
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG
    let kanal = ayarlar.giriskanal;
  
if(message.channel.id !== kanal) return message.react(emoji);

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send(`${emoji} Bu işlemi sadece yetkililer yapabilir`)

if(!args[0]) return message.channel.send(`${emoji} Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${emoji} ${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = '<a:no2:756946169883656193> Şüpheli'
if (kurulus > 1296000000) kontrol = '<a:budur:740278066248548422> Güvenli'
  
  
  
let isim = args[1]

if(!isim) return message.channel.send(`${emoji} Üyenin ismini belirtmelisin.`)

let yaş = args[2];

if(!yaş) return message.channel.send(`${emoji} Üyenin yaşını belirtmelisin.`)  
const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
let tag = ayarlar.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${tag} ${isim} ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(kadınROL)
  message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL)
  if(ayarlar.kadınICON) {
    let kadınICON = ayarlar.kadınICON
      message.guild.members.cache.get(kullanıcı.id).roles.add(kadınICON)
  }
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).roles.remove(fakeROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Kadın** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
message.react(basari)
let embed2 = new MessageEmbed()
.setDescription(`
• ${kullanıcı} adlı kullanıcı **${isim} ${yaş}** olarak sunucumuza kayıt oldu. 
• Kaydını yapan kişi : ${message.author}
`)



client.channels.cache.get(ayarlar.kayıtLOG).send(embed2)
let embed3 = new MessageEmbed()
.setColor('WHITE')

.setDescription(`
• <a:planta_siyahtac:789879331391799306> ${kullanıcı} <a:planta_siyahtac:789879331391799306> adlı kişinin kaydı başarıyla yapıldı.
• İsim Yaş • **${isim} ${yaş}**
• Verilen Roller • <@&${ayarlar.kadınROL}>
• Alınan Roller • <@&${ayarlar.kayıtsızROL}>, <@&${ayarlar.fakeROL}>

`)
message.channel.send(embed3).then(m => m.delete({timeout : '10000'}))


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
  permLevel: 0
};

exports.help = {
  name: 'kadın'
}