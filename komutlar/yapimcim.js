const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    var embed = new Discord.MessageEmbed()
    .setTitle("Yapımcım Adam Gibi Adam")
    .setDescription("<@429357746002067493>,<@440521528770035714>
  name: 'yapımcım',
  kategori: 'genel',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};