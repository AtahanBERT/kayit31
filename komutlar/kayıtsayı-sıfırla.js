const { Discord, MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const emoji = ayarlar.basarisizemoji;
const basari = ayarlar.basariliemoji;
let yetkili = ayarlar.forever;

exports.run = async (client, message, args) => {

if (message.author.id !== ayarlar.sahip & message.author.id !== ayarlar.baran & message.author.id !== ayarlar.eray)
return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bu işlemi sadece yetkililer yapabilir`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}))

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let üye = message.mentions.users.first()
if(!üye) return message.channel.send(new MessageEmbed().setDescription(`${emoji} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

db.delete(`erkek.sayı_${üye.id}`)
db.delete(`toplam.sayı_${üye.id}`)  
db.delete(`kadın.sayı_${üye.id}`) 
message.react(basari)

message.channel.send(new MessageEmbed().setDescription(`${basari} ${message.author}, ${üye} Adlı kullanıcının kayıtları-sıfırlandı, ${message.author} Tarafından Sıfırlandı.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x348f36').setTimestamp()).then(x => x.delete({timeout: 5000}))


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

