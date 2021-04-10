const moement = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

let durum = ayarlar.durum;

module.exports = client => {
  client.user.setStatus("online");

client.user.setActivity(durum)
};

