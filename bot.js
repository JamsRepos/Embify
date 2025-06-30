require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const token = process.env.DISCORD_BOT_TOKEN;

class URLFilter {
    constructor() {
        this.urlPatterns = [
            // Twitter/X
            /https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+(\/(photo|video)\/\d+)?/,
            /https:\/\/(www\.)?x\.com\/[a-zA-Z0-9_]+\/status\/\d+(\/(photo|video)\/\d+)?/,

            // TikTok
            /https:\/\/(www\.)?tiktok\.com\/(t\/\w+|@[\w.]+\/video\/\d+)/,
            /https:\/\/vm\.tiktok\.com\/\w+/,
            /https:\/\/vt\.tiktok\.com\/\w+/,

            // Reddit
            /https:\/\/(www\.|old\.)?reddit\.com\/r\/[\w]+\/comments\/[\w]+\/[\w]+/,
            /https:\/\/(www\.|old\.)?reddit\.com\/r\/[\w]+\/s\/[\w]+/,

            // Instagram
            /https:\/\/(www\.)?instagram\.com\/share\/[\w]+/,
            /https:\/\/(www\.)?instagram\.com\/(p|reels?)\/[\w]+/,
            /https:\/\/(www\.)?instagram\.com\/share\/(p|reels?)\/[\w]+/,

            // Twitch Clips
            /https:\/\/m\.twitch\.tv\/clip\/[\w]+/,
            /https:\/\/clips\.twitch\.tv\/[\w]+/,
            /https:\/\/(www\.)?twitch\.tv\/[\w]+\/clip\/[\w]+/,

            // Bluesky
            /https:\/\/(www\.)?bsky\.app\/profile\/[\w.]+\/post\/[\w]+/,

            // Facebook
            /https:\/\/(www\.)?facebook\.com\/share\/r\/[\w]+/,
            /https:\/\/(www\.)?facebook\.com\/reel\/\d+/,

            // Bilibili
            /https:\/\/(www\.|m\.)?bilibili\.com\/video\/[\w]+/,
            /https:\/\/(www\.)?b23\.tv\/[\w]+/,

            // Tumblr
            /https:\/\/(www\.)?tumblr\.com\/[a-zA-Z0-9_-]+\/[0-9]+\/[a-zA-Z0-9_-]+/,

            // Threads
            /https:\/\/(www\.)?threads\.(net|com)\/@[\w.]+/,
            /https:\/\/(www\.)?threads\.(net|com)\/@[\w.]+\/post\/[\w]+/
        ];

        this.urls = {
            // Twitter/X
            "twitter.com": [
                { domain: "fxtwitter.com", name: "FxEmbed" },
                { domain: "vxtwitter.com", name: "BetterTwitFix" }
            ],
            "x.com": [
                { domain: "fixupx.com", name: "FxEmbed" },
                { domain: "fixvx.com", name: "BetterTwitFix" }
            ],

            // TikTok
            "tiktok.com": [
                { domain: "tnktok.com", name: "fxTikTok" },
                { domain: "vxtiktok.com", name: "vxtiktok" }
            ],

            // Reddit
            "reddit.com": [
                { domain: "rxddit.com", name: "FixReddit" },
                { domain: "vxreddit.com", name: "vxReddit" }
            ],

            // Instagram
            "instagram.com": [
                { domain: "ddinstagram.com", name: "InstaFix" },
                { domain: "kkinstagram.com", name: "KKInstagram" }
            ],

            // Twitch
            "clips.twitch.tv": [
                { domain: "fxtwitch.seria.moe/clip", name: "fxtwitch" }
            ],
            "m.twitch.tv": [
                { domain: "fxtwitch.seria.moe", name: "fxtwitch" }
            ],
            "twitch.tv": [
                { domain: "fxtwitch.seria.moe", name: "fxtwitch" }
            ],

            // Bluesky
            "bsky.app": [
                { domain: "bskx.app", name: "VixBluesky" },
                { domain: "fxbsky.app", name: "FxEmbed" }
            ],

            // Facebook
            "facebook.com": [
                { domain: "fxfb.seria.moe", name: "fxfacebook" }
            ],

            // Bilibili
            "m.bilibili.com": [
                { domain: "fxbilibili.seria.moe", name: "fxbilibili" },
                { domain: "vxbilibili.com", name: "BiliFix" }
            ],
            "bilibili.com": [
                { domain: "fxbilibili.seria.moe", name: "fxbilibili" },
                { domain: "vxbilibili.com", name: "BiliFix" }
            ],
            "b23.tv": [
                { domain: "fxbilibili.seria.moe/b23", name: "fxbilibili" },
                { domain: "vxb23.tv", name: "BiliFix" }
            ],

            // Tumblr
            "tumblr.com": [
                { domain: "tpmblr.com", name: "fxtumblr" }
            ],

            // Threads
            "threads.net": [
                { domain: "fixthreads.net", name: "FixThreads" },
                { domain: "vxthreads.net", name: "vxThreads" }
            ],
            "threads.com": [
                { domain: "fixthreads.net", name: "FixThreads" },
                { domain: "vxthreads.net", name: "vxThreads" }
            ]
        };
    }

    logError(context, error) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] [ERROR] [${context}]: ${error.message}`);
        if (error.stack) {
            console.error(`Stack trace: ${error.stack}`);
        }
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
                        // Normalize URL by removing www. prefix
                        let amendedUrl = url.replace(/www\./g, '');
                        const baseDomain = this.getDomainFromUrl(amendedUrl);

                        if (!baseDomain) continue;

                        // Check if we have alternatives for this domain
                        for (const [domain, alternatives] of Object.entries(this.urls)) {
                            if (amendedUrl.includes(domain)) {
                                try {
                                    await message.suppressEmbeds(true);
                                } catch (error) {
                                    this.logError('suppressEmbeds', error);
                                }

                                // Get primary (first) alternative and create the URL
                                const primaryAlt = alternatives[0];
                                const primaryUrl = amendedUrl.replace(domain, primaryAlt.domain);

                                // Immediately reply with just the URL
                                const initialReply = await message.reply({
                                    content: primaryUrl,
                                    allowedMentions: { repliedUser: false }
                                });

                                // Check if the primary option is working in the background
                                setTimeout(async () => {
                                    try {
                                        // Check if primary alternative is working
                                        const isPrimaryWorking = await this.checkUrlAvailability(primaryUrl);

                                        // If primary is not working and we have fallbacks, try them
                                        if (!isPrimaryWorking && alternatives.length > 1) {
                                            // Try fallback alternatives in order
                                            for (let i = 1; i < alternatives.length; i++) {
                                                const fallbackAlt = alternatives[i];
                                                const fallbackUrl = amendedUrl.replace(domain, fallbackAlt.domain);

                                                const isFallbackWorking = await this.checkUrlAvailability(fallbackUrl);

                                                if (isFallbackWorking) {
                                                    // Update message with just the working fallback URL
                                                    await initialReply.edit({
                                                        content: fallbackUrl,
                                                        allowedMentions: { repliedUser: false }
                                                    });
                                                    break; // Found a working fallback, exit loop
                                                }

                                                // If this is the last alternative and none worked, leave the original URL
                                                // No need to edit with a warning since we want to keep it simple
                                            }
                                        }
                                    } catch (error) {
                                        this.logError('backgroundChecking', error);
                                    }
                                }, 0); // Run immediately but in the background

                                break; // Stop checking other domains once a match is found
                            }
                        }

                        break; // Exit pattern loop after finding a match
                    }
                }
            } catch (error) {
                this.logError('onMessage', error);
            }
        }
    }

    extractUrls(text) {
        const urls = [];
        // Enhanced URL detection regex that better handles URLs with special characters
        const regex = /(https?:\/\/[^\s<>"']+)/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            // Trim any trailing punctuation that might not be part of the URL
            let url = match[0];
            url = url.replace(/[.,;:!?)]+$/, '');
            urls.push(url);
        }
        return urls;
    }

    // Helper method to get the base domain of a URL
    getDomainFromUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (error) {
            this.logError('getDomainFromUrl', error);
            return null;
        }
    }

    // Check if a URL is available by making a HEAD request
    async checkUrlAvailability(url, timeout = 2000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await axios({
                method: 'head',
                url: url,
                signal: controller.signal,
                timeout: timeout,
                validateStatus: status => status < 500, // Accept any status code below 500
                headers: {
                    'User-Agent': 'Embify Discord Bot/1.3.0'
                }
            });

            clearTimeout(timeoutId);
            return response.status >= 200 && response.status < 400;
        } catch (error) {
            // Don't log timeout errors as they're expected
            if (error.code !== 'ECONNABORTED' && !error.message.includes('aborted')) {
                this.logError('checkUrlAvailability', error);
            }
            return false;
        }
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

    // Log supported domains with their alternatives
    console.log(`[!] Supported domains with alternatives:`);
    Object.entries(urlFilter.urls).forEach(([domain, alternatives]) => {
        console.log(`    - ${domain}:`);
        alternatives.forEach(alt => {
            console.log(`      * ${alt.name}: ${alt.domain}`);
        });
    });
});

client.login(token);
