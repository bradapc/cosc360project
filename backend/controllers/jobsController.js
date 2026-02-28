const Job = require('../models/Job');

const handleGetJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('createdBy', 'username');
        return res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
};

const handleGetJobById = async (req, res) => {
    const jobId = req.params.id
    try {
        const job = await Job.findById(jobId).populate('createdBy', 'username');
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        return res.status(200).json(job);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const handleDeleteJob = async (req, res) => {
    const jobId = req.params.id
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }

        if (job.createdBy._id.toString() !== req.user.userId) {
            return res.status(401).json({message: "Unauthorized to perform deletion"});
        }
        //TODO: Add admin check as admins can delete jobs too

        const deleteJob = await Job.findByIdAndDelete(jobId);
        if (!deleteJob) {
            return res.status(404).json({message: "Job not found"});
        }

        return res.status(200).json({message: "Job deleted successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const handlePostJob = async (req, res) => {
    try {
        const {title, company, salaryRange, category, responsibilities, techRequirements, benefits, customQuestions} = req.body;

        if (!title || !company || !salaryRange || !category || !responsibilities || !techRequirements || !benefits || !customQuestions) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const createdBy = req.user?.userId;

        if (!createdBy) {
             return res.status(401).json({message: "Unauthorized"});
        }

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

module.exports = {handleGetJobs, handlePostJob, handleGetJobById, handleDeleteJob}