const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleRegister = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Registration data not provided'})
    }

    const result = validateData(req.body);
    if (!result.valid) {
        return res.status(400).json({'message': `${result.msg}`});
    }

    const {username, password, dateOfBirth, firstName, lastName, emailAddress} = req.body;

    //Check database for username
    const dbResult = await User.findOne({username});
    if (dbResult) {
        return res.status(409).json({'message': 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        username,
        hashedPassword,
        dateOfBirth,
        firstName,
        lastName,
        emailAddress
    }

    await User.create(user);
    return res.status(201).json({'message': `User ${username} created successfully`});
};

const validateData = (body) => {
    const result = {
        "valid": true,
        "msg": ""
    }
    if (!body.username) {
        result.valid = false;
        result.msg = "Missing username"
    } else if (!body.password) {
        result.valid = false;
        result.msg = "Missing password"
    } else if (!body.dateOfBirth) {
        result.valid = false;
        result.msg = "Missing date of birth"
    } else if (!body.firstName) {
        result.valid = false;
        result.msg = "Missing first name"
    } else if (!body.lastName) {
        result.valid = false;
        result.msg = "Missing last name"
    } else if (!body.emailAddress) {
        result.valid = false;
        result.msg = "Missing email address"
    } else if (!body.confirmPassword) {
        result.valid = false;
        result.msg = "Missing password confirmation"
    } else if (body.password !== body.confirmPassword) {
        result.valid = false;
        result.msg = "Passwords do not match"
    }
    return result;
};

module.exports = {handleRegister}