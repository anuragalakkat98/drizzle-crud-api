// src/db/index.js
// Change imports to require
const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const schema = require('./schema.js'); // require returns the exports object
require('dotenv/config'); // Use require for side effects

const sqlite = new Database(process.env.DATABASE_URL || 'sqlite.db');
sqlite.pragma('journal_mode = WAL');

const db = drizzle(sqlite, { schema }); // Pass the schema object directly

// Change exports to module.exports or exports.
exports.db = db;
exports.schema = schema; // Export the required schema object
