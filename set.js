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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUZDZzRhU1FnbmJ5SlROaVdkbHREWjZmakxONmtpUUlXb2J6UE1peHQyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHRNT2dpSXVGOGtMaXV3dWN5RWx4Slp2c3FISHVrYVJjbVIvcDlnVW1DZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhREdocU9WRXl5NVNTYWpYcThwaHY3dk9YWWVKS3NxZDhBaXNzWGFNTzAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTnNBRS9Ub2NaeW4xSU1sVndzajA2WndRd1ZFRGEwbUV2WWUyS3doRTFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNDYXlFZS9yRmZJUG9mci8yMVcxWENMOHdIMjUwNUUrTTVJZkJCb3hCbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB6anZ1YVR3a1JtS3lhZTZoWTNmWUk1dFN3dStBZUpidk8wNG5kd3MzMnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5PbUlESGVjRTJGeTlGVUViWDFYd1Fsc2hieUlmamxKR3BBdnhKL2ZWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHRlQ3FtVmFjbkxwUU5qOVlNVlZsdWRPOFpKM0FFOC9jTmZLQklGUmFCST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imx2NEtzMUlJK2s0RythRmZRd1Z3dlZnbkovZWlhOFVoM3creTVRbG9zM2hSaVM5NDlldVVoMWNKaE9QV2RKL1IvQ2I5Q1FEUXpqNWVFN1ZGWktjYWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6InF4V1VuRExZTldEeE4rdHQzMk1wRk5JSTVHSEdWMmxDZU1QTEhnejBBTWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MUE5NDBENUE4MjNENDk1NDQ2NkM3OTkwMEI3NDYxNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMjA1NTA5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdCM0I1QTlFQ0Y0NzhBNkQ3MTcxNDQzMzQwNjI4MUUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDEyMDU1MTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjkyMzBBMTM3RDgzRkEzNTBERTU1OTU2QTY5QjZEN0UifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTIwNTUxNH0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENzQ2OEJDNTFDMTQ0NDRFRThBNjAyRTQ2OUU2MDRGRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMjA1NTE0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYWllNaWtKSFMxS0d3MTd3X29mOW5RIiwicGhvbmVJZCI6ImVlYmQ0OTM5LTgzZTEtNGQ5YS1hMTU4LTIyMWU1ZTJlMjY2YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUOTMwV01RWC8xUXZMK1gzekJmZGZsdWlKcVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHdzNEtmSmdvTTl4aWVsMFpIUG05K0pXc3pBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iks2Q05UUjUzIiwibWUiOnsiaWQiOiI0OTE1NTYyMzc4MzQzOjk0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ii4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05qUHlTMFE5OStpdmdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjcyVjExbEladmFsSnZGMjYyYk1YdzM0bktnUk45S28zQ09ndys0SDRlUnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhHbnNVYUdrS2U4VC9FRXY2ZkpZNjRMemZ4SnZiYzdBU0c5b1BFWkQ4clAybWNYYVI1VW9KSExQeE5Vc1hVK0tmUnNLZG9FeUhFS0g4Nm80WWJRaERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtZlN5aGNEVnlIbGo0eVZETFRaRHJQaXlnVTEvQ1JQd0RKRXRxcXBoeFhGai9IY2VDdGRMWUoycS9nd29WR3c0MFBldVIwWE1QTlE3QVc1d2VWN0hqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQ5MTU1NjIzNzgzNDM6OTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTlsZGRaU0diMnBTYnhkdXRtekY4TitKeW9FVGZTcU53am9NUHVCK0hrYiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTIwNTUwOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHL2MifQ==',
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
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
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
