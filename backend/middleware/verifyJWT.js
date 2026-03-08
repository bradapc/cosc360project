const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const jwtToken = req.cookies?.jwt;
    if (!jwtToken) {
        return res.status(401).json({message: 'Access token missing'});
    }
    try {
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, role: payload.role };
        next();
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }
};

module.exports = verifyJWT;