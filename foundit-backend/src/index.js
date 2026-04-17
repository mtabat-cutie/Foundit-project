const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Basic Health Check
app.get('/', (req, res) => {
    res.send('FoundiT API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
