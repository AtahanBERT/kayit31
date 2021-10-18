const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db')
let ayarlar = require('../ayarlar.json')
let emoji = ayarlar.basarisizemoji;
let basari = ayarlar.basariliemoji;
exports.run = async (client, message, args) => {
    
if(!message.member.roles.cache.has(ayarlar.yetkiliROL) & !message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bu işlemi sadece yetkililer yapabilir.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

  let üye = message.mentions.users.first()
  if(!üye) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
  let rol = message.mentions.roles.first()
  let member = message.guild.member(üye)
  let erkekpuanlar = db.fetch(`erkek.sayı_${üye.id}_${message.guild.id}`)
  let kadınpuanlar = db.fetch(`kadın.sayı_${üye.id}_${message.guild.id}`)
  let total = kadınpuanlar + erkekpuanlar
db.delete(`isim.${üye.id}`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stat','istatistik','kayıtsayı','kayitsayi','kayıtpuan','stats'],
  permLevel: 0
};

exports.help = {
  name: 'eraysil'
}