const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const { sequelize } = require('./models');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const gadgetRoutes = require('./routes/gadgetRoutes');

app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

// Add a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the IMF Gadget API!');
});

// Error handling middleware (should come after all routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});