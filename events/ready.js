const moement = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

let prefix = ayarlar.prefix;

const discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
client.user.setStatus("dnd");
client.user.setActivity(`ま PŁΛЛTΛ TΞΛM`, { type:'PLAYING' })
  
  console.log("")
});