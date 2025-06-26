const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Use require, not import
const feedbackRoutes = require('./routes/feedback');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//api
app.use('/feedback', feedbackRoutes);

//server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });