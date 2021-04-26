const router = require('express').Router();

const {
    getSingleUser,
    createUser,
    loginUser
} = require('../../controllers/user-controllers');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/login').post(loginUser);

module.exports = router;