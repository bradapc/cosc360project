const postApplication = async (req, res) => {
    const application = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        linkedin: req.body.linkedin,
        experienceYears: req.body.experienceYears,
        experienceDescription: req.body.experienceDescription,
        answers: req.body.answers,
        jobId: req.body.jobId
    };
    console.log(application);
};

module.exports = {postApplication}