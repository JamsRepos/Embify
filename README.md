# Discord URL Embedder

Discord URL Embedder is a Discord bot that intercepts messages containing URLs from specific domains and replies with an amended URL. This is useful for bypassing Discord's automatic URL embedding for certain websites.

## Features

- Intercepts messages containing URLs from specific domains
- Replaces the domain in the URL with a specified replacement
- Replies with the amended URL

## Setup

### Prerequisites

- Node.js
- npm
- A Discord bot token

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Discord-URL-Embedder.git
```

2. Navigate to the project directory:

```
cd Discord-URL-Embedder
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