const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();


// Initiating express app
const app = express();

// Connect to Mongo
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected!"))
    .catch(err => console.error(err))

// Cross-Origin Resource Sharing
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => res.send("PUBLISH SERVICE"));

app.use('/publish', require('./routes/publish'));

// Start listening on PORT
app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));