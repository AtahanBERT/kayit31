const moement = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

let durum = ayarlar.durum;

module.exports = client => {
  let durum = ayarlar.durum
client.user.setActivity(durum, {type: 'PLAYING'}); 

}