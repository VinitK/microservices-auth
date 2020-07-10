const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;