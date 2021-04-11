const ayarlar = require('../ayarlar.json');
module.exports = message => {
  const Discord = require('discord.js')
  let basarisiz = ayarlar.basarisizemoji;
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if(command == '') return;
message.channel.send(new Discord.MessageEmbed()
.setDescription(`${basarisiz} Botta **` + command + '** Adında Bir Komut Bulunamadı.')
.setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  }}
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};