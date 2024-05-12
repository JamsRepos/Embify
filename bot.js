require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_BOT_TOKEN;

class URLFilter {
    constructor() {
        this.urlReplacements = {
            "tiktok.com": "tiktxk.com",
            "twitter.com": "fxtwitter.com",
            "x.com": "fixupx.com",
            "instagram.com": "ddinstagram.com"
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
                message.suppressEmbeds(true);
                for (const [domain, replacement] of Object.entries(this.urlReplacements)) {
                    if (url.includes(domain)) {
                        const amendedUrl = url.replace(domain, replacement);
                        message.reply({ content: amendedUrl, allowedMentions: { repliedUser: false } })
                            .catch(error => console.error(`Failed to send message: ${error}`));
                        break;
                    }
                }
            } catch (error) {
                console.error(`Error handling message: ${error.message}`);
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