const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');


exports.run = async (client, message, args) => {
 
    let yetkili = ayarlar.kyetkili;
    let unregister = ayarlar.kayıtsızROL;
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(kullanıcı);
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let tag = ayarlar.tag


   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
   if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('<a:plantacarp:815252488168931368> Kayıtsıza atabilmek için bir kullanıcı belirtmelisin!')).then(x => x.delete({timeout: 3000}));
   if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
   if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:plantacarp:815252488168931368> Sahibimin üzerinde komut kullanamazsın!`));

member.roles.cache.forEach(r => {
member.roles.add(unregister);
member.setNickname(`${tag}| -İsim Yaş-`);
member.roles.remove(r.id);
});
  

return message.react(basarili)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unregister","ur"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'kayıtsız',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}