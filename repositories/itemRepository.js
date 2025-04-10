// src/repositories/itemRepository.js
// Change imports to require
const { db, schema } = require('../db/index.js'); // Use require
const { eq } = require('drizzle-orm');          // Use require

const { items } = schema;

class ItemRepository {
    // ... (keep async methods as they are) ...
    async getAll() {
        try {
            return await db.select().from(items).orderBy(items.id).all();
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error('Failed to retrieve items from database.');
        }
    }

    async getById(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return null;
        }
        try {
            return await db.select().from(items).where(eq(items.id, numericId)).get();
        } catch (error) {
            console.error(`Error in getById for ID ${id}:`, error);
            throw new Error('Failed to retrieve item from database.');
        }
    }

    async create(itemData) {
        try {
            const result = await db.insert(items).values(itemData).returning().get();
            return result;
        } catch (error) {
            console.error("Error in create:", error);
            throw new Error('Failed to create item in database.');
        }
    }

    async update(id, itemData) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return null;
        }
        try {
            const updatedItem = await db.update(items)
                .set(itemData)
                .where(eq(items.id, numericId))
                .returning()
                .get();
            return updatedItem || null;
        } catch (error) {
            console.error(`Error in update for ID ${id}:`, error);
            throw new Error('Failed to update item in database.');
        }
    }

    async delete(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return false;
        }
        try {
            const result = await db.delete(items).where(eq(items.id, numericId)).run();
            return result.changes > 0;
        } catch (error) {
            console.error(`Error in delete for ID ${id}:`, error);
            throw new Error('Failed to delete item from database.');
        }
    }
}

// Change export default to module.exports
module.exports = new ItemRepository();
