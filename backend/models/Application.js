const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    linkedin: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    experienceDescription: {
        type: String,
        required: true
    },
    answers: [
    {
        question: String,
        answer: String
    }
    ],
    status: {
        type: String,
        enum: ['hired', 'under review', 'not reviewed'],
        default: 'not reviewed'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
    }, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);