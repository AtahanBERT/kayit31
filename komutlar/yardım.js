const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:plantacarp:815252488168931368> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}

    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;



const planta = new Discord.MessageEmbed()
.setFooter('Extacy Community Tarafından Yapılmıştır.')
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setDescription(`
 > **\`${prefix}erkek -> .e @üye <isim> <yaş>\`**
 > **\`${prefix}kadın -> .k @üye <isim> <yaş>\`**
 > **\`${prefix}kayıtsayı -> .stat @üye\`**
 > **\`${prefix}tag (tagımızı gösterir) \`**
 > **\`${prefix}ping (pingimi gösterir) \`**
 > **\`${prefix}toplam-komut -> .tkomut (toplam komutumu gösteir)\`**
 > **\`${prefix}yapımcım (yapımcımı gösterir)\`**
 > **\`${prefix}isimdeğiştir -> .isim @üye <isim> \`** `)
 message.channel.send(planta)
  
}
exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help','yardim'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}