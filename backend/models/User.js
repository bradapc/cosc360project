const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
    }, { timestamps: true });

module.exports = mongoose.model('User', userSchema);