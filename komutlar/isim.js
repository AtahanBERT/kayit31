const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {

if (!message.member.roles.cache.get(ayarlar.yetkiliROL)) return message.reply(`${basarisiz} Bu Komutu Kullanmak İçin **Yetkili** Olmalısın!`); 

let tag = ayarlar.tag;
let isim = args.slice(1).join(' ');
let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
if(!kullanici) return message.reply(`${basarisiz} Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isim @üye <yeni isim>\``)

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!isim) return message.reply(`${basarisiz} Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isim @üye <yeni isim>\``)
if(isim.length > 32) return message.reply(`${basari} Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`)
  
message.guild.members.cache.get(kullanici.id).setNickname(`${tag} ${isim}`)
message.channel.send(new Discord.MessageEmbed().setDescription(`${basari} Başarılı bir şekilde \`${kullanici.username}\` adlı kişinin kullanıcı adı \`${tag} ${isim}\` olarak değiştirildi.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp())
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimdegistir','ideğiş','idegis','isim','i'],
    permLevel: 0
}

exports.help = {
    name: 'isimdeğiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı <kullanıcı adı>'
};