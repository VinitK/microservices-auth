const express = require("express");
const jwt = require("jsonwebtoken");

const Article = require('../models/Article');

const router = express.Router();

// Verify Token middleware
const verifyToken = (req, res, next) => {
    // Get auth header
    const jwtHeader = req.headers['authorization'];
    // check if JWT is undefined
    if (typeof jwtHeader !== "undefined") {
        // Get token from Array from splitting token
        const jwtToken = jwtHeader.split(" ")[1];
        jwt.verify(jwtToken, "secretKey", (err, authData) => {
            if (err) {
                console.error(err)
                res.sendStatus(403)
            } else {
                req.user = authData.user;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

router.post('/new', verifyToken, (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.user._id
    });
    newArticle.save()
        .then(article => res.status(201).send(article))
        .catch(err => console.error(err));
});

module.exports = router;