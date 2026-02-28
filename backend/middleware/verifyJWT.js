const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return res.status(401).json({message: 'Access token missing'});
    }

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = { id: payload.userId, role: payload.role };
        next();
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }
};

module.exports = verifyJWT;