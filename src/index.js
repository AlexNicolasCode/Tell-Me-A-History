const Discord = require("discord.js");
const bot = new Discord.Client();
const file = require("./data/data.json");

bot.on("message", msg => {
    if (msg.content.substr(0, 7) == "!tellme") {
      const newMsg = msg.content.substr(8);
      const data = require(`./history/${newMsg}`);
      msg.channel.send(data);
      console.log("New message was been sended");
    }
});

bot.login("TOKEN");