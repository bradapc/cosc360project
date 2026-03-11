const Job = require('../models/Job');
const allowedUpdates = ["title", "description", "salaryRange", "company", "category", "responsibilities", "techRequirements", "benefits", "customQuestions", "status"];

const handleGetJobs = async (req, res) => {
    try {
        const { search, category, status, minSalary, skills, sortBy, sortOrder } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {query.category = { $regex: category, $options: 'i' };
}
        if (status) query.status = status;
        if (minSalary) {
        query['salaryRange.max'] = { $gte: Number(minSalary) }; 
        }

        if (skills) {
            const skillsArray = skills.split(',').map(skill => skill.trim());
            query.techRequirements = { $in: skillsArray }; 
        }


        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        } else {
            sortOptions.createdAt = -1; 
        }

        const jobs = await Job.find(query)
            .sort(sortOptions)
            .populate('createdBy', 'username');

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
        const {title, description, company, salaryRange, category, responsibilities, techRequirements, benefits, customQuestions} = req.body;

        if (!title || !description || !company || !salaryRange || !category || !responsibilities || !techRequirements || !benefits || !customQuestions) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const createdBy = req.user?.userId;

        if (!createdBy) {
             return res.status(401).json({message: "Unauthorized"});
        }

        const job = new Job({
            title,
            description,
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

const handleUpdateJob = async (req, res) => {
    const jobId = req.params.id;
    const updates = {};

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    try {
        const updatedJob = await Job.findOneAndUpdate(
            {_id: jobId, createdBy: req.user.userId},
            updates,
            {returnDocument: 'after', runValidators: true}
        );

        if (!updatedJob) {
            return res.status(404).json({message: "Job not found or unable to update job"});
        }

        return res.status(200).json({message: "Job updated successfully", job: updatedJob});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }
};

module.exports = {handleGetJobs, handlePostJob, handleGetJobById, handleDeleteJob, handleUpdateJob}