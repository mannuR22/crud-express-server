const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');
const db = require('./config/db');
const { PORT } = require('./config/environment');

require('dotenv').config();
db(); //Database Handshake
app.use(bodyParser.json());
app.use('/api', bookRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
