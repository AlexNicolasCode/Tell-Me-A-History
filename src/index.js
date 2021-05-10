const { Client, MessageEmbed } = require("discord.js");
const bot = new Client();
const file = require("./data/data.json");
const jsonfile = require("jsonfile");
const wiki = require("wikipedia");
const fs = require("fs")

bot.on("message", msg => {
    if (msg.content.substr(0, 7) == "!tellme") {
      const newMsg = msg.content.substr(8).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      console.log(newMsg)
      const folderPath = `./history/${newMsg}.json`;

      if (fs.existsSync(folderPath)) {
        const data = JSON.parse(fs.readFileSync(folderPath));
        const content = new MessageEmbed()
          .setTitle(data.title)
          .setColor(0xff0000)
          .setDescription(data.summary)
          .setImage(data.image)
          .setURL(data.url)

        msg.channel.send(content);
        console.log("New message was been sended");
      } else {
        (async () => {
          try {
            console.log("Searching...")

            const page = await wiki.page(newMsg);
            const summary = await page.summary();
            const fileName = await newMsg.toLowerCase();
            const arr = 
            {
                title: summary.title,
                summary: summary.extract,
                url: page.fullurl,
                image: summary.thumbnail.source
            }

            jsonfile.writeFile(`./history/${fileName}.json`, arr, function (err) {
              console.log(`${fileName}.json has been created!`)
              if (err) console.error(err)
            })

            setTimeout(() => {
              const data = JSON.parse(fs.readFileSync(folderPath));
              const content = new MessageEmbed()
                .setTitle(data.title)
                .setColor(0xff0000)
                .setDescription(data.summary)
                .setImage(data.image)
                .setURL(data.url)

              msg.channel.send(content);
              console.log("New message was been sended");
            }, 5)

          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
});

bot.login("ODMxMDMwMzY4NjkzNzgwNTEw.YHPTVw.9vkcP7K3BkFrAfwUPcjqeQv-uRY");