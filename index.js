require('dotenv').config()
const { Client, MessageEmbed } = require("discord.js");
const bot = new Client();
const wiki = require("wikipedia");

bot.on("message", async msg => {
    if (msg.content.substr(0, 7) == "!tellme") {
        const newMsg = await msg.content.substr(8).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        console.log(newMsg)

        try {
            console.log("Searching...")

            const page = await wiki.page(newMsg);
            const summary = await page.summary();

            setTimeout(() => {
                const content = new MessageEmbed()
                    .setTitle(summary.title)
                    .setColor(0xff0000)
                    .setDescription(summary.extract,)
                    .setURL(page.fullurl,)
    
                msg.channel.send(content);
                console.log("New message was been sended");
            }, 5)

        } catch (err) {
            console.log(err);
        }
    }
});

bot.login(process.env.TOKEN);