const User = require('../models/User');
const allowedUpdates = ["firstName", "lastName", "emailAddress", "username", "hashedPassword", "dateOfBirth"];

const handleGetUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-hashedPassword');
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        if(req.body.user.userId !== userId && req.body.user.role !== 'admin') {
            return res.status(403).json({message: "Forbidden: You can only delete your own account"});
        }

        const deleteUser = await User.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json({message: "User deleted successfully"});
    } catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const handlePostUser = async (req, res) => {
    const{firstName, lastName, emailAddress, username, password, dateOfBirth} = req.body;
    if(!firstName || !lastName || !emailAddress || !username || !password || !dateOfBirth) {
        return res.status(400).json({message: "Missing required fields"});
    }
    try {
        const existingUser = await User.findOne({$or: [{emailAddress}, {username}]});
        if(existingUser) {
            return res.status(409).json({message: "Email address or username already in use"});
        }

        const newUser = new User({firstName, lastName, emailAddress, username, password, dateOfBirth});
        await newUser.save();
        return res.status(201).json({message: "User created successfully"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

const handleUpdateUser = async (req, res) => {
    const userId = req.params.id;
    updates = {};

    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$set: updates},
            {new: true, runValidators: true}
        );
    
        if(!updatedUser){
            return res.status(404).json({message: "User not found"});
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports = {handlePostUser, handleGetUserById, handleDeleteUser, handleUpdateUser}