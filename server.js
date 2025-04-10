// src/server.js

const express = require('express');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// --- Middleware ---
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies (optional, for form submissions)
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
// Base route
app.get('/', (req, res) => {
    res.send('CRUD API is running!');
});

// Mount the item routes under the /api/items prefix
app.use('/api/items', itemRoutes);

// --- Basic Error Handling (Optional but Recommended) ---
// Catch-all for 404 Not Found routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Generic error handler middleware (catches errors from routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}/api/items`);
});
