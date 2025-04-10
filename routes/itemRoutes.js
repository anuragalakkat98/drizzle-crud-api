// src/routes/itemRoutes.js
const express = require('express');
const itemController = require('../controllers/itemController');
const validate = require('../middleware/validationMiddleware'); // Import the middleware
const {
    createItemSchema,
    updateItemSchema,
    itemIdParamSchema
} = require('../schemas/itemSchema'); // Import the schemas

const router = express.Router();

// Define CRUD routes for items

// GET all items (no validation needed here unless adding query param validation)
router.get('/', itemController.getAllItems);

// POST: Validate request body using createItemSchema
router.post('/',
    validate(createItemSchema, 'body'), // Apply body validation
    itemController.createItem
);

// GET by ID: Validate the ID parameter
router.get('/:id',
    validate(itemIdParamSchema, 'params'), // Apply param validation
    itemController.getItemById
);

// PUT by ID: Validate ID parameter AND request body
router.put('/:id',
    validate(itemIdParamSchema, 'params'), // Validate ID first
    validate(updateItemSchema, 'body'),   // Then validate body
    itemController.updateItem
);

// DELETE by ID: Validate the ID parameter
router.delete('/:id',
    validate(itemIdParamSchema, 'params'), // Apply param validation
    itemController.deleteItem
);

module.exports = router;
