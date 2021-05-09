const Discord = require("discord.js");
const bot = new Discord.Client();
const file = require("./data/data.json");

bot.on("message", msg => {
    if (msg.content == "!tellme batman") {
      const newMsg = msg.content.substr(8);
      const data = require(`./history/${newMsg}`);
      msg.channel.send(data);
      console.log("New message was been sended");
    }
});

bot.on("message", msg => {
  if (msg.content === "!tellme flash") {
    msg.channel.send(file.flash)
    console.log("New message was been sended")
  }
});

bot.on("message", msg => {
  if (msg.content === "!tellme lol") {
    msg.channel.send(file.lol)
    console.log("New message was been sended")
  }
});

bot.on("message", msg => {
  if (msg.content === "!tellme jackson") {
    msg.channel.send(file.jackson)
    console.log("New message was been sended")
  }
});

bot.login("TOKEN");