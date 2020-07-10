const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

require('dotenv').config();
require('./utils/passportsetup');


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

// cookie session
app.use(cookieSession({
    name: "anaha-session",
    keys: ["key1", "key2"]
}));

// initialize Passport
app.use(passport.initialize());
// use session
app.use(passport.session());

// Routes
app.get("/", (req, res) => res.send("AUTHENTICATION SERVICE"));


app.use('/auth', require('./routes/auth'));

// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/dash', isLoggedIn, (req, res) => {
    jwt.sign({ user: req.user }, 'secretKey', (err, token) => {
        res.json({
            token
        })
    });
});

// Start listening on PORT
app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));