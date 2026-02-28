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

    res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 3600000,
        path: '/'
    });

    return res.status(200).json({message: "User log in successful",
        userId: user._id
    });
};

module.exports = {handleLogin}