const router = require('express').Router();

const {
    getGroup,
    createGroup,
    groupJoinRequest,
    getJoinRequests,
    groupResponseRequests
} = require('../../controllers');

const { authMiddleware } = require('../../utils/auth');

router.route('/:title').get(getGroup);

router.route('/').post(authMiddleware, createGroup);
router.route('/join').post(authMiddleware, groupJoinRequest);
router.route('/join-requests').get(getJoinRequests);
router.route('/respond-request').put(groupResponseRequests);

module.exports = router;