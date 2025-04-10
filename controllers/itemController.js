// src/controllers/itemController.js
const itemRepository = require('../repositories/itemRepository.js');

class ItemController {
    // ... getAllItems (no changes needed) ...
    async getAllItems(req, res) {
        try {
            const items = await itemRepository.getAll();
            res.status(200).json(items);
        } catch (error) {
            console.error("Controller Error in getAllItems:", error);
            res.status(500).json({ message: 'Error retrieving items', error: error.message });
        }
    }


    // ... getItemById (no changes needed, ID is validated and transformed by middleware) ...
     async getItemById(req, res) {
        try {
            // req.params.id is now guaranteed to be a number by the middleware
            const { id } = req.params;
            const item = await itemRepository.getById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            console.error("Controller Error in getItemById:", error);
            res.status(500).json({ message: 'Error retrieving item', error: error.message });
        }
    }

    // POST /items
    async createItem(req, res) {
        try {
            // No need for basic validation here, req.body is validated by middleware
            const newItemData = req.body;
            const createdItem = await itemRepository.create(newItemData);
            res.status(201).json(createdItem);
        } catch (error) {
            console.error("Controller Error in createItem:", error);
            // Handle potential DB-level errors (e.g., unique constraints if added)
            res.status(500).json({ message: 'Error creating item', error: error.message });
        }
    }

    // PUT /items/:id
    async updateItem(req, res) {
        try {
            // req.params.id is validated/transformed
            // req.body is validated (optional fields, non-empty, no extra fields)
            const { id } = req.params;
            const itemData = req.body;

            // The check for empty body is now handled by Zod's .refine in the schema
            // delete itemData.id; // No longer strictly necessary as .strict() prevents it
            // delete itemData.createdAt;

            const updatedItem = await itemRepository.update(id, itemData);
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error("Controller Error in updateItem:", error);
            res.status(500).json({ message: 'Error updating item', error: error.message });
        }
    }

    // DELETE /items/:id
    async deleteItem(req, res) {
        try {
             // req.params.id is validated/transformed
            const { id } = req.params;
            const success = await itemRepository.delete(id);
            if (!success) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error("Controller Error in deleteItem:", error);
            res.status(500).json({ message: 'Error deleting item', error: error.message });
        }
    }
}

module.exports = new ItemController();
