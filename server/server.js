require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const products = require('./routes/products');

const app = express();


// middleware for cross-origin resource sharing
app.use(cors());

// midleware to parse incoming requires with JSON payloads
app.use(express.json());

// middleware for uploading files
app.use(fileUpload());

// Static File
app.use('/uploads', express.static('uploads'));

// Router
app.use('/api/v1/products', products);


// listening port
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});