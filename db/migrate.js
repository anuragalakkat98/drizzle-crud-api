// src/db/migrate.js
// Change imports to require
const { migrate } = require('drizzle-orm/better-sqlite3/migrator');
const { db } = require('./index.js'); // Require the db instance exported from index.js
require('dotenv/config'); // Use require for side effects

console.log("Running migrations...");

try {
    // This command will automatically find the migrations folder (defined in drizzle.config.js)
    migrate(db, { migrationsFolder: './drizzle' }); // The migrate function itself is likely async internally or handles sync operations
    console.log("Migrations applied successfully!");
    process.exit(0); // Exit script cleanly
} catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1); // Exit with error
}
