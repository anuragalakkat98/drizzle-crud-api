// src/schemas/itemSchema.js
const { z } = require('zod');

// Base schema for item fields that can be created or updated
const itemBaseSchema = z.object({
  name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          })
          .trim() // Remove leading/trailing whitespace
          .min(1, { message: "Name cannot be empty" }), // Ensure name is not just whitespace

  description: z.string({
                   invalid_type_error: "Description must be a string",
                 })
                 .trim()
                 .optional(), // Optional field

  price: z.number({
             invalid_type_error: "Price must be a number",
           })
           .positive({ message: "Price must be a positive number" })
           .optional(), // Optional field
});

// Schema for creating an item (requires name, allows optional fields)
// .strict() ensures no extra fields are allowed in the body
const createItemSchema = itemBaseSchema.strict({
    message: "Invalid fields provided for creation."
});

// Schema for updating an item (all fields are optional, but at least one must be present)
// .partial() makes all fields optional
// .strict() ensures no extra fields are allowed
const updateItemSchema = itemBaseSchema.partial().strict({
    message: "Invalid fields provided for update."
}).refine(data => Object.keys(data).length > 0, {
    message: "Update body cannot be empty and must contain at least one valid field to update.",
    // path: [] // Optional: specify a general path for the error
});

// Schema for validating the ID parameter in the URL
const itemIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, { message: "ID parameter must be a positive integer string" })
          .transform(val => parseInt(val, 10)) // Convert valid string to number
});


module.exports = {
    createItemSchema,
    updateItemSchema,
    itemIdParamSchema,
};
