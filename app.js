const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Middleware

app.use(cors());
app.use(express.json());

// Import Routes

const membersRoute = require('./routes/members');

app.use('/members', membersRoute);

// ROUTES

app.get('/', (req, res) => {
    res.send("Homepage")
});

// Connect to DB

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

// Boot up server

app.listen(3000)