const { Discord, MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const emoji = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;
let yetkili = ayarlar.forever;

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(yetkili) & !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${emoji} Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let üye = message.mentions.users.first() || message.author

db.delete(`erkek.sayı_${üye.id}`)
db.delete(`toplam.sayı_${message.author.id}`)  
db.delete(`kadın.sayı_${üye.id}`) 
message.react(basari)

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("AQUA")
.setDescription(`${member} Adlı Kullanıcının Db'si Silindi, <@${message.author.id}> Tarafından Sıfırlandı.`))


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla","kayıt-sıfırla","kayıtları-sıfırla","db-sıfırla","dbisil","db-sil","kayıtsayı-sıfırla","sifirla"],
    permLevel: 0
};

exports.help = {
    name: "sıfırla"
}

