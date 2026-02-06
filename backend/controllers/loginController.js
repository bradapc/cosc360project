const {connectToDb} = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Login information not provided'})
    }

    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username or password not provided'});
    }

    //Check database for username
    const db = await connectToDb();
    const collection = db.collection('users');
    const dbResult = await collection.findOne({username: username});
    if (!dbResult) {
        return res.status(409).json({'message': 'User not found'})
    }

    const match = await bcrypt.compare(password, dbResult.hashedPassword);
    if (!match) {
        return res.status(401).json({'message': 'No match'})
    }

    const payload = {
        userId: dbResult.id,
        role: dbResult.role
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '15m'});

    return res.status(201).json(accessToken);
};

module.exports = {handleLogin}