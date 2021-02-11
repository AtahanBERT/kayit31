const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    var embed = new Discord.MessageEmbed()
    .setTitle("Yapımcım Adam Gibi Adam")
    .setDescription("<@429357746002067493> | ! ま Atahan Ŧαякєтмєz#0001")
    .setImage('https://images-ext-2.discordapp.net/external/dwVm_qFu7T7a4Rsj_MScV8tS3t5J5ekX960xaeoQEiQ/https/images-ext-1.discordapp.net/external/gCG42Oo2aXDL7c-yZJ6YMSfvcwT58Sc00k-OKLlpkG4/https/media0.giphy.com/media/NKEt9elQ5cR68/200.gif')
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