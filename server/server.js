const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGODB_URI); // Debugging line

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/events', require('./routes/events'));
app.use('/api/incentives', require('./routes/incentives'));
app.use('/api/weather', require('./routes/weather'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));