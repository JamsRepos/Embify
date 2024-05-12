# Embify

Embify is a Discord bot that intercepts messages containing URLs from social media sites and replies with an embed supported alternative.

## Features

- Listens to user messages for social media URL's.
- Disables the original URL's embed.
- Replies to the user with an embed supported URL.

## Supported Websites

The bot currently supports intercepting URLs from the following social media apps:

- `TikTok`
- `Twitter/X`
- `Instagram`

If you want to add support for more websites, you can modify the `supportedWebsites` array in the `bot.js` file.

## Hosted Instance

I have a self-hosted instance of the bot currently, if you wish to invite this to your server instead of running your own then feel free.

[![Invite the Bot](https://dcbadge.limes.pink/api/shield/654822309781176320?bot=true)](https://discord.com/oauth2/authorize?client_id=654822309781176320&permissions=11264&scope=bot+applications.commands)

## Setup

### Prerequisites

- Node.js
- npm
- A Discord bot token

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JamsRepos/Embify.git
```

2. Navigate to the project directory:

```
cd Embify
```

3. Install the dependencies:

```
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
