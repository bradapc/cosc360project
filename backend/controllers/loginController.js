const {handleLoginRequest} = require('../services/login');

const handleLogin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Login information not provided'})
    }

    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username or password not provided'});
    }

    await handleLoginRequest(res, username, password);
};

module.exports = {handleLogin}