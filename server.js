require('dotenv').config();
const dns = require('dns');

// Force DNS lookup using Google DNS to fix querySrv ECONNREFUSED
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug log
console.log("Checking MONGO_URI:", process.env.MONGO_URI ? "LOADED OK" : "UNDEFINED");

// Register API Routes
app.use('/api/employees', employeeRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Employee Management API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});