const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const path = require('path');

// Initialize Express
const app = express();
dotenv.config();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// API Routes (Add your API routes here)
app.get('/api/hello', (req, res) => {
  res.send('Hello from backend!');
});

if (true) {
  app.use(express.static(path.join(__dirname, './client/dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist', 'index.html'));
  });
}

// Routes
app.use('/api/users', userRoutes);


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
