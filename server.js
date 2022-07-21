const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./db/db");
const admin = require('./routes/admin/admin');
require('dotenv').config();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api/admin', admin)

app.listen(3000, () => {
    if (connectDB()) {
        console.log('Server is running on port 3000');
    }
})