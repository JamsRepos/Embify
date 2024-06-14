require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_BOT_TOKEN;

class URLFilter {
    constructor() {
        this.urlReplacements = {
            "tiktok.com": "tiktxk.com",
            "twitter.com": "fxtwitter.com",
            "x.com": "fixupx.com",
            "instagram.com": "d.ddinstagram.com",
            "youtube.com": "yfxtube.com"
        };
    }

    onMessage(message) {
        if (message.author.bot) {
            return;
        }

        console.log(`[!] ${message.author.tag} said: ${message.content}`);

        const urls = this.extractUrls(message.content);
        urls.forEach(url => {
            try {
                let amendedUrl = url.replace('www.', '');
                for (const [domain, replacement] of Object.entries(this.urlReplacements)) {
                    if (amendedUrl.includes(domain)) {
                        message.suppressEmbeds(true).catch(error => {
                            console.error(`Failed to suppress embeds: ${error}`);
                            return; // Skip this URL if we can't suppress embeds
                        });

                        amendedUrl = amendedUrl.replace(domain, replacement);
                        message.reply({ content: amendedUrl, allowedMentions: { repliedUser: false } })
                            .catch(error => console.error(`Failed to send reply: ${error}`));
                        break;
                    }
                }
            } catch (error) {
                console.error(`Error handling message: ${error}`);
            }
        });
    }

    extractUrls(text) {
        const urls = [];
        const regex = /http[s]?:\/\/\S+/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            urls.push(match[0]);
        }
        return urls;
    }
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
const urlFilter = new URLFilter();

client.on('messageCreate', message => {
    urlFilter.onMessage(message);
});

client.once(Events.ClientReady, readyClient => {
    console.log(`[!] ${readyClient.user.tag} is online and listening to messages!`);
});

client.login(token);
