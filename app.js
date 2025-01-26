const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
app.use(cors());
app.use(errorHandler);
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// Routes
const gadgetRoutes = require('./routes/gadgetRoutes');
app.use('/gadgets', gadgetRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});