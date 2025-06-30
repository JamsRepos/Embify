# Embify

Embify is a Discord bot that intercepts messages containing URLs from social media sites and replies with an embed supported alternative.

## Features

- Listens to user messages for social media URL's.
- Disables the original URL's embed.
- Immediately provides a clean, embed-friendly link without extra text.
- Silently checks if the primary link is working in the background.
- Automatically falls back to working alternatives if needed.

## Supported Websites

The bot currently supports intercepting URLs from the following social media apps with multiple alternatives:

- **Twitter/X**:
  - [FxEmbed](https://github.com/FxEmbed/FxEmbed) (Primary)
  - [BetterTwitFix](https://github.com/dylanpdx/BetterTwitFix) (Fallback)

- **TikTok**:
  - [fxTikTok](https://github.com/okdargy/fxTikTok) (Primary)
  - [vxtiktok](https://github.com/dylanpdx/vxtiktok) (Fallback)

- **Reddit**:
  - [FixReddit](https://github.com/MinnDevelopment/fxreddit) (Primary)
  - [vxReddit](https://github.com/dylanpdx/vxReddit) (Fallback)

- **Instagram**:
  - [InstaFix](https://github.com/Wikidepia/InstaFix) (Primary)
  - [KKInstagram](https://github.com/Wikidepia/InstaFix) (Fallback)

- **Twitch Clips**:
  - [fxtwitch](https://github.com/seriaati/fxtwitch)

- **Bluesky**:
  - [VixBluesky](https://github.com/Lexedia/VixBluesky) (Primary)
  - [FxEmbed](https://github.com/FxEmbed/FxEmbed) (Fallback)

- **Facebook**:
  - [fxfacebook](https://github.com/seriaati/fxfacebook)

- **Bilibili**:
  - [fxbilibili](https://github.com/seriaati/fxbilibili) (Primary)
  - [BiliFix](https://vxbilibili.com) (Fallback)

- **Tumblr**:
  - [fxtumblr](https://github.com/knuxify/fxtumblr)

- **Threads**:
  - [FixThreads](https://github.com/milanmdev/fixthreads) (Primary)
  - [vxThreads](https://github.com/everettsouthwick/vxThreads) (Fallback)

## How It Works

When a user posts a link to a supported social media site, Embify:

1. Detects the URL and matches it to a supported platform
2. Suppresses the original embed to prevent duplicate embeds
3. Immediately replies with a clean, embed-friendly URL (no extra text or formatting)
4. Checks in the background if the primary URL is working
5. If the primary URL isn't working, automatically updates the message with a working alternative URL

This approach ensures users always get functioning embed links even when some services are down.

## Hosted Instance

I have a self-hosted instance of the bot currently, if you wish to invite this to your server instead of running your own then feel free.

[![Invite the Bot](https://dcbadge.limes.pink/api/shield/654822309781176320?bot=true)](https://discord.com/oauth2/authorize?client_id=654822309781176320&permissions=11264&scope=bot+applications.commands)

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Discord bot token

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JamsRepos/Embify.git
```

2. Navigate to the project directory:

```bash
cd Embify
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory of the project and add your Discord bot token to it:

```env
DISCORD_BOT_TOKEN=your-token-here
```

### Usage

1. Start the bot:

```bash
node bot.js
```

2. Invite the bot to your Discord server.

3. The bot will now intercept messages containing URLs from the specified domains and reply with an amended URL.

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
