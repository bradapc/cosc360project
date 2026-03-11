const User = require('../models/User');

const handleGetUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-hashedPassword');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

module.exports = {handleGetUser}