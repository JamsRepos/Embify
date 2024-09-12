require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_BOT_TOKEN;

class URLFilter {
    constructor() {
        this.urlPatterns = [
            /https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+(\/photo|\/video\/\d+)?/,
            /https:\/\/x\.com\/[a-zA-Z0-9_]+\/status\/\d+(\/photo|\/video\/\d+)?/,
            /https:\/\/www\.tiktok\.com\/(t\/\w+|@[\w.]+\/video\/\d+)/,
            /https:\/\/vm\.tiktok\.com\/\w+/,
            /https:\/\/vt\.tiktok\.com\/\w+/,
            /https:\/\/www\.reddit\.com\/r\/[\w]+\/comments\/[\w]+\/[\w]+/,
            /https:\/\/www\.instagram\.com\/(p|reels?)\/[\w]+/,
            /https:\/\/m\.twitch\.tv\/clip\/[\w]+/,
            /https:\/\/clips\.twitch\.tv\/[\w]+/
        ];
        
        this.urls = {
            "twitter.com": "fxtwitter.com",
            "x.com": "fixupx.com",
            "tiktok.com": "vxtiktok.com",
            "reddit.com": "rxddit.com",
            "instagram.com": "ddinstagram.com",
            "clips.twitch.tv": "fxtwitch.seria.moe/clip",
            "m.twitch.tv": "fxtwitch.seria.moe"
        };
    }

    async onMessage(message) {
        if (message.author.bot) {
            return;
        }

        const urls = this.extractUrls(message.content);
        for (const url of urls) {
            try {
                for (const pattern of this.urlPatterns) {
                    if (pattern.test(url)) {
                        let amendedUrl = url.replace('www.', '');

                        for (const [domain, replacement] of Object.entries(this.urls)) {
                            if (amendedUrl.includes(domain)) {
                                // Try to suppress the embed and log any errors, but continue if it fails
                                try {
                                    await message.suppressEmbeds(true);
                                } catch (error) {
                                    console.error(`Failed to suppress embeds (continuing): ${error}`);
                                }

                                // Replace the domain and reply with the amended URL
                                amendedUrl = amendedUrl.replace(domain, replacement);
                                try {
                                    await message.reply({
                                        content: amendedUrl,
                                        allowedMentions: { repliedUser: false }
                                    });
                                } catch (error) {
                                    console.error(`Failed to send reply: ${error}`);
                                }

                                break; // Stop checking other patterns once a match is found
                            }
                        }

                        break; // Exit after finding the first matching pattern
                    }
                }
            } catch (error) {
                console.error(`Error handling message: ${error}`);
            }
        }
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

client.on('messageCreate', async message => {
    await urlFilter.onMessage(message);
});

client.once(Events.ClientReady, readyClient => {
    console.log(`[!] ${readyClient.user.tag} is online and listening to messages!`);
});

client.login(token);
