const { Client, MessageEmbed } = require("discord.js");
const bot = new Client();
const file = require("./data/data.json");
const jsonfile = require("jsonfile");
const wiki = require("wikipedia");
const fs = require("fs")

bot.on("message", msg => {
    if (msg.content.substr(0, 7) == "!tellme") {
      const newMsg = msg.content.substr(8);
      const folderPath = `./history/${newMsg}.json`;

      if (fs.existsSync(folderPath)) {
        const data = require(folderPath);
        const content = new MessageEmbed()
          .setTitle(newMsg[0].toUpperCase() + newMsg.substring(1))
          .setColor(0xff0000)
          .setDescription(data)

        msg.channel.send(content);
        console.log("New message was been sended");
      } else {
        (async () => {
          try {
            console.log("Searching...")

            const page = await wiki.page(newMsg);
            const summary = await page.summary();
            const title = await summary.title.toLowerCase();

            jsonfile.writeFile(`./history/${title}.json`, summary.extract, function (err) {
              console.log(`${title}.json was been created!`)
              if (err) console.error(err)
            })

            setTimeout(() => {
              const data = require(folderPath);
              msg.channel.send(data);
              console.log("New message was been sended");
            }, 5)

          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
});


bot.login("TOKEN");