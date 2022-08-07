const express = require('express');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./db/db");
const admin = require('./routes/admin/admin');
require('dotenv').config();


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
})

//Routes
app.get('/', (_, res) => res.send('Books Management API'));
app.use('/api/admin', admin)

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    if (connectDB()) {
        console.log(`Server is running ${process.env.PORT || 3001}`);
    }
})
