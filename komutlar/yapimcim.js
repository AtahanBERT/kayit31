const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    var embed = new Discord.MessageEmbed()
    .setTitle("Yapımcım Adam Gibi Adam")
    .setDescription("<@429357746002067493> | ! ま Atahan Ŧαякєтмєz#1353")
    .setImage('https://dynamic.brandcrowd.com/asset/logo/2fa9614c-e8fd-47be-b522-14aa07bd8f22/logo?v=4&text=Atahan')
    .setColor("#2c2f33")
    message.channel.send({embed})
}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar','yapimcim','yapimci',],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  kategori: 'genel',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};