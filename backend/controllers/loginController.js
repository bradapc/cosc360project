const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleLogin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Login information not provided'})
    }

    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username or password not provided'});
    }

    //Check database for username
    const user = await User.findOne({username}).select('+hashedPassword');
    if (!user) {
        return res.status(404).json({'message': 'User not found'})
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        return res.status(401).json({'message': 'Invalid password'})
    }

    const payload = {
        userId: user._id,
        role: user.role || 'user'
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '15m'});

    return res.status(201).json({accessToken});
};

module.exports = {handleLogin}