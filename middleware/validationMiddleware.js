// src/middleware/validationMiddleware.js
const { ZodError } = require('zod');

// Middleware generator function
const validate = (schema, type = 'body') => {
  return (req, res, next) => {
    try {
      let dataToValidate;
      switch (type) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        default:
          throw new Error('Invalid validation type specified');
      }

      // Parse and validate the data
      const validatedData = schema.parse(dataToValidate);

      // Replace the original data with the validated (and potentially transformed) data
      // This is useful for transformations like string-to-number for params
      if (type === 'body') req.body = validatedData;
      if (type === 'params') req.params = { ...req.params, ...validatedData }; // Merge validated params
      if (type === 'query') req.query = validatedData;


      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for a user-friendly response
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        // Use 400 Bad Request for validation errors
        return res.status(400).json({ message: "Validation failed", errors });
      }
      // Handle unexpected errors
      console.error("Unexpected validation error:", error);
      res.status(500).json({ message: "Internal Server Error during validation" });
    }
  };
};

module.exports = validate;
