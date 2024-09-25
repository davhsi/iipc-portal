// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const facultyVisitRoutes = require('./routes/facultyVisitRoutes');
const industryExpertRoutes = require('./routes/industryExpertRoutes'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());  // Parses incoming JSON requests
app.use(cors());  // Enables Cross-Origin Resource Sharing

// Basic logger to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// Handle login requests (simple authentication)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const allowedEmail = 'iipc@bitsathy.ac.in';
  const allowedPassword = 'iipc';

  if (email === allowedEmail && password === allowedPassword) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Use the Industry Expert routes

app.use('/api/industry-experts', industryExpertRoutes);
app.use('/api/faculty-visits', facultyVisitRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
