const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db')
let ayarlar = require('../ayarlar.json')
let emoji = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
exports.run = async (client, message, args) => {
    
if(!message.member.roles.cache.has(ayarlar.yetkiliROL) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setDescription(`${emoji} Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

  let üye = message.mentions.users.first() || message.author
  if (!üye) return message.channel.send(`${emoji} Üye Etiketler misin ?`)
  let rol = message.mentions.roles.first()
  let member = message.guild.member(üye)
  let erkekpuanlar = db.fetch(`erkek.sayı_${üye.id}`)
  let kadınpuanlar = db.fetch(`kadın.sayı_${üye.id}`)
  let total = kadınpuanlar + erkekpuanlar
  let lecrain = new MessageEmbed()
  .setAuthor(`Kayıt Sayı | Kişi : ${üye.username}`)
  .setColor('BLACK')
  .setDescription(`
<a:mega:828241745862066206> Toplam Kadın Kayıtı Sayın : **${kadınpuanlar ? kadınpuanlar : 'Hiç Kadın Birini Kayıt Etmedin'}** 

<a:mega:828241745862066206> Toplam Erkek Kayıtı Sayın : **${erkekpuanlar ? erkekpuanlar : 'Hiç Erkek Birini Kayıt Etmedin'}** 

<a:mega:828241745862066206> Tüm Sayı Toplamları : **${total ? total : 'Kayıt Sayın Yok'}**
  `)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`, message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })) 
        .setThumbnail(member.user.avatarURL({dynamic: true}))
  message.react(basari)
  return message.channel.send(lecrain)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stat','istatistik','kayıtsayı','kayitsayi','kayıtpuan','stats'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsayı'
}