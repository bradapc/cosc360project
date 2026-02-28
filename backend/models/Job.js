const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    salaryRange: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
    },
    category: {
        type: String,
        required: true
    },
    responsibilities: {
        type: [String],
        required: true
    },
    techRequirements: {
        type: [String],
        default: []
    },
    benefits: {
        type: [String],
        default: []
    },
    customQuestions: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    }, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);