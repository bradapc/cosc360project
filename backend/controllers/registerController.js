const {connectToDb} = require('../db/connection');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Registration data not provided'})
    }

    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username or password not provided'});
    }

    //Check database for username
    const db = await connectToDb();
    const collection = db.collection('users');
    const dbResult = await collection.findOne({username: username});
    if (dbResult) {
        return res.status(409).json({'message': 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        username,
        hashedPassword
    }

    await collection.insertOne(user);
    return res.status(201).json({'message': `User ${username} created successfully`});
};

module.exports = {handleRegister}