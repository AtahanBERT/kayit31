const { Discord, MessageEmbed } = require('discord.js');
const db = require("quick.db")
let ayarlar = require('../ayarlar.json')
let emoji = ayarlar.basarisizemoji;
exports.run = async (client, message, args) => {
    
if(!message.member.roles.cache.has(ayarlar.yetkiliROL) & !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setDescription(`${emoji} Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

  let üye = message.mentions.users.first() || message.author
  if (!üye) return message.channel.send('Üye Etiketler misin ?')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(üye)
  let erkekpuanlar = db.fetch(`kayıt.puan.erkek.${üye.id}`)
    let kadınpuanlar = db.fetch(`kayıt.puan.kadın.${üye.id}`)
    let total = kadınpuanlar + erkekpuanlar
  let lecrain = new Discord.MessageEmbed()
  .setAuthor(`Kayıt Puan | Kişi : ${üye.username}`)
  .setColor('BLACK')
  .setDescription(`
<a:mega:828241745862066206> Toplam Kadın Kayıtı Puanın : **${kadınpuanlar ? kadınpuanlar : 'Hiç Kadın Birini Kayıt Etmedin'}** 

<a:mega:828241745862066206> Toplam Erkek Kayıtı Puanın : **${erkekpuanlar ? erkekpuanlar : 'Hiç Kadın Birini Erkek Etmedin'}** 

<a:mega:828241745862066206> Tüm Puan Toplamları : **${total ? total : 'Kayıt Puanın Yok'}**
  `)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
        .setThumbnail(member.user.avatarURL())
  message.react('')
  return message.channel.send(lecrain)
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  permlevel: 0,
  aliases: ["stats","stat","kaçkişiyikayıtettim","kayıtpuan"],
};
  
exports.help = {
  name: 'kayıtpuan',
  description: 'kayıt',
  usage: 'kayıtpuan @üye'
}