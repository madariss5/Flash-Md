const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUkxdlFHbCtGYXdydHc0dVdvMzR6eTJPRnVxeVV3M3J5allnTEpLeGVGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1Zvbk9FUUdsT0JtVThsNWJjQzBZUEFtUmYxTGhPb2pWbkJlSEF1UFhBOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQ2RrSDl2dkNqbjRtYk1GTVdzZ0NSZjkxMDBiRzZicmY1dE1HUEVHUzAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwM1JleHN5bHJENno2TEMxZjBkMVBEcTh1OTRrQjhneTMxbzZHZ3g4T1NRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1JOXpUbFc1WGxpOXBQRmZUeXpETTdYd3FvVEtLdVBzSlVqdmtuTm5xVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZtSTBKM3hydUNjS2prLzFRNWJaQnhjcktKSDZVVVZvMExEbU5ueTlaMWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUREeDBsazBkalVFa0hMS3ltQTVUNmgxTDllWEJVMzduckZNUzFUV00zOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamIvZWdDekFIWnVIeGROQVR3YzhaQlVPOUlxc3dOUTEwWXhCV20yWlJETT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg2cDRLNVh4eVF6SzRoYkdRQzFqS2g1U2FRcmxBcTdVc0w3UVJCLzRSaS8xUHlSUmNtRXZSWWdBU3BjRUVITzdVUVZsU0Jpak1USTdJK1lhd2lYa2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjksImFkdlNlY3JldEtleSI6IjhicEd1ZEZ1SHVrMHhDUmI5SHBjSzVZbGZxU3lsMy9MdnBWVTZJSVFlVTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1Mjk3RkMwRkFCNUFFMzMwNzk1MEU2QjAxMEY1M0I3RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzMjc3MDk5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVBQkFBNUQzREY3Mjk1NTlGQjU0QkMyNDExRkEwREY1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMyNzcxMDB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndUR0lkZ29zUUJlS3BuZUdnb2pwN2ciLCJwaG9uZUlkIjoiZDRjZTY5YTgtMTg0NC00MDVhLThjMGUtOTkzNTUwODA4NjBlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVlQ0pVT0R1TFh2QkVZeHRDTTJJcWNMbEQ5WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxS3dNVmd4a2xkZDlWbE1tU2E1bHFXQlN0SVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMVBTOEpWWUQiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6NDBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQkxBQ0tTS1ktTUQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BiUHlTMFFuWmlodndZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjcyVjExbEladmFsSnZGMjYyYk1YdzM0bktnUk45S28zQ09ndys0SDRlUnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IklkSEZGSUsvQzF5VnFNSDNQWjBOQlI4WFAwSlp2WWNJMVEvVGhpbjhPQVVWMkhKSjN1LzI1R3Q3VUNWMjZ3ejA1QzFjTWZFSXhSZjJ0MGJSNXprY0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXeFMxQU45TnE5YlZ2T3BMWGEzZEpyaWNHMmxYdEtuT2g1di9LK0FiV3crUWNWM0pXd0h0MGlWakltTWlZekJxWHluQU1MbGRCRXFoeURRRHRvZDlnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQ5MTU1NjIzNzgzNDM6NDBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTlsZGRaU0diMnBTYnhkdXRtekY4TitKeW9FVGZTcU53am9NUHVCK0hrYiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MzI3NzA5OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJajcifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Martin",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "4915563151347",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Europe/Germany',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
