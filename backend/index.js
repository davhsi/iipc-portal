const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const industryExpertRoutes = require('./routes/industryExpertRoutes'); 
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Handle login requests
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
app.use('/api', industryExpertRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
