// src/db/schema.js
// Change imports to require
const { sqliteTable, text, integer, real } = require('drizzle-orm/sqlite-core');
const { sql } = require('drizzle-orm');

// Change export const to exports.
exports.items = sqliteTable('items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price'),
  createdAt: integer('created_at', { mode: 'timestamp' })
             .default(sql`(strftime('%s', 'now'))`),
});

// You can define other tables here using exports.tableName = ...
