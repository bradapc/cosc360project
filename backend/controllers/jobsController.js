const Job = require('../models/Job');

const handleGetJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('createdBy', 'username');
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

const handlePostJob = async (req, res) => {
    try {
        const {title, company, salaryRange, category, responsibilities, techRequirements, benefits, customQuestions} = req.body;

        if (!title || !company || !salaryRange || !category || !responsibilities || !techRequirements || !benefits || !customQuestions) {
            return res.status(400).json({message: "Missing required fields"});
        }

        // const createdBy = req.user?._id;

        // if (!createdBy) {
        //     return res.status(401).json({message: "Unauthorized"});
        // }

        const mongoose = require('mongoose')

        const createdBy = new mongoose.Types.ObjectId('63f0e8b9c1e2a5d3f0b4c123'); //TEST

        const job = new Job({
            title,
            company,
            salaryRange,
            category,
            responsibilities,
            techRequirements: techRequirements || [],
            benefits: benefits || [],
            customQuestions: customQuestions || [],
            createdBy
        });

        await job.save();

        return res.status(201).json({message: `Job "${title}" created successfully`, job})

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
};

module.exports = {handleGetJobs, handlePostJob}