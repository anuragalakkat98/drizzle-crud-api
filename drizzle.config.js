// drizzle.config.js
import 'dotenv/config';

export default {
  schema: './db/schema.js', // Path to your schema file
  out: './drizzle',            // Directory to output migration files
  dialect: 'sqlite',           // <-- CHANGE 'driver' TO 'dialect' and set value to 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL || 'sqlite.db', // Path to your SQLite file
  }
};
