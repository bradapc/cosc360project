const Application = require('../models/Application');

const getApplicationById = async (req, res) => {
    const applicationId = req.params.id;
    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({message: "Application not found"});
        }
        return res.status(200).json(application);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const postApplication = async (req, res) => {
    try {
        const {firstName, lastName, email, linkedin, experienceYears, experienceDescription, answers, jobId} = req.body;

        if (!firstName || !lastName || !email || !linkedin || experienceYears === undefined || !experienceDescription || !answers || !jobId) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const createdBy = req.user?.userId;

        if (!createdBy) {
                return res.status(401).json({message: "Unauthorized"});
        }

        const application = new Application({
            firstName,
            lastName,
            email,
            linkedin,
            experienceYears,
            experienceDescription,
            answers,
            jobId,
            createdBy
        });

        await application.save();

        return res.status(201).json({message: `Application created successfully`, id: application._id})

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server error"});
    }

};

module.exports = {postApplication, getApplicationById}