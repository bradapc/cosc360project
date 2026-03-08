const jwt = require('jsonwebtoken');

const checkAuth = async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({loggedIn: false});
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.json({loggedIn: true, userId: payload.userId, role: payload.role});
    } catch (err) {
        res.status(401).json({loggedIn: false});
    }
};

module.exports = {checkAuth}