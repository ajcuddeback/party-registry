const { User } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
        const userData = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!userData) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' })
        }

        res.json(userData);
    },

    async createUser({ body }, res) {
        const userData = await User.create(body);

        if(!userData) {
            return res.status(400).json({ message: 'Something went wrong!' });
        };

        const token = await signToken(userData);

        res.json({ token, userData });
    },

    async loginUser({ body }, res) {
        const userData = await User.findOne({
             username: body.username 
        });

        if(!userData) {
            return res.status(400).json({ message: 'Cannot find a user with this username!' });
        };

        const correctPw = await userData.isCorrectPassword(body.password);

        if(!correctPw) {
            return res.status(400).json({ message: 'Incorrect Password!' });
        };

        const token = await signToken(userData);

        res.json({ token, userData });
    }
}