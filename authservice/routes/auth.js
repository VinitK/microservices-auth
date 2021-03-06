const express = require("express");
const passport = require("passport");

const User = require("../models/User");

const router = express.Router();

router.get('/failed', (req, res) => res.send("Login failed. Try again later."));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    (req, res) => res.redirect('/dash'));


router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;