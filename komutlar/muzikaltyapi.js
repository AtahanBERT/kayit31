const Discord = require('discord.js');
const client = new Discord.Client()
let emoji = client.emojis.get('751558669585612830')
exports.run = function(client, message, args) {
  let kullanıcı = message.mentions.members.first()
    let yetkililer = ['298684780034392066']
    if (!message.member.roles.has('734904074272506028')) return message.channel.send('Bu Komutu Kullanamazsın')
  var role = message.guild.roles.find(role => role.id === "768058118482427904"); 
  if(!role) return message.channel.send('')
  kullanıcı.addRole(role);
  let embed2 = new Discord.RichEmbed()
  .setTitle(` ${emoji} • __\`Müzik Altyapı Rolü Verildi\`__   `)
  .setDescription(`
${emoji} • __**\` Yetkili \`**__ ${message.author}

${emoji} • __**\` Kullanıcı \`**__ ${kullanıcı}`)  
  let embed = new Discord.RichEmbed()
  .setTitle(` ${emoji} • __\`Müzik Altyapı Rolü Başarıyla Verildi\`__   `)
  .setDescription(`
${emoji} • __**\` Yetkili \`**__ ${message.author}

${emoji} • __**\` Kullanıcı \`**__ ${kullanıcı}`)
  
  message.channel.send(embed);
    client.channels.get('770985262415085568').send(embed2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['music'],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'abone'
};
