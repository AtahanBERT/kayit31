const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply(`${basarisiz} ${message.author}, Yazmam için herhangi bir şey yazmalısın.`);
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['söyle'],
  permLevel: 2
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};