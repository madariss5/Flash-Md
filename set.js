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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlBSMW9ZdUd6YjFYeFNWbGdwSWpvaTFFeldWNlFuaVNFNVhFUkczQ3dWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JkVVA1NGZ6NGk5NVBrams1SFVCRk1la01vMXVqU21aY1JXZVFKRE5sMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSlYzbmtOQ205Y2taNUxFb1Q1U29TVUlnZGlveWM2REpWc2dMOXFzU0ZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPN0VPVmNyUGgyTTRvYWZNUXcxdVcyelEydWUwVVZ6ekE3cnc5aFFwWWdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LbHg4cG03d3hsbnV2ODJ5d2I3OElBT201eG1VM2FhaEJrbzZvNUdiSHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVhdHJQUi9RVCs2TnVYbU1WOHBJcm9SWmtlNndZT2t3c1dTQTRYeE9kQkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BrSzRSRHBRZTlydW1aeXFRQXZGNHczd0RjZUFmOUlxWndmdlhMZDZGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmJBYkNDZ1FIQ0laU1FIcGdkdFdycnp2ZGR2dFVCSlJmQmcycnFjd1d4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpHeUJqdWx4WVBtcWQwb2VsWXNXVmFsNENmZ05kZk14NCs2R3VFalB0bFFIdU56R0hGcmdqdlBTenVWRDJFWFNIZmhna1hra2hZb2FnRmxQTE1VM2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJtSkdWVlN6M05ycThDK2tsM2xsczYwSDM5Vis1Q2JFdlB2RDFnUTloajlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzk3Qjg5QTczOUQzNzZCQTVGMjVDQUE3NDBEOTgxNzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTcxMjA5MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQzM1NEJFNjMxNTI1MDc0MjlGQUY4NkZGMDk3RjA3QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxNzEyMDkxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxcWlaTEtOSVNsR3VHVGg0aFpTYjZ3IiwicGhvbmVJZCI6IjAyNGRkNWQwLWQ5NzMtNDBiOC1iYTY3LTE4NWY4MmVjODU5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrVnN4NElKSzZXSlQ2cFcyY25UNDZKd3ZFb2M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUE8xN0tEcTE4bXVla25vTy9iT0N4bng5QURzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlkyWE42U0RGIiwibWUiOnsiaWQiOiI0OTE1NTYyMzc4MzQzOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjNQeVMwUXpkWEJ2Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicHRsZTQvd0c5UUNRcE5QUHhjTjA0aGNTNnpJKzlXcVkyOUZzMEtic3FDZUFGRXo2dzM3NFViT0FEWFVVVTBDR0FzTk1XYnJua2FYLzRaS1NKeXA1Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkhaM2xpNEF6R3kwNzE1TlF2NGRFc1NWM2xvV2xUYlU5NnE1ZWdqRkxzcDY0cG5VM0sxM1NLU2dkOEJCbXN2aER2SXQwNEZDMnhwQ2VLeTM4VVZpR2dBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0MzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmU5bGRkWlNHYjJwU2J4ZHV0bXpGOE4rSnlvRVRmU3FOd2pvTVB1QitIa2IifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE3MTIwOTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFpaIn0=',
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
