const { Group, GroupRequest, User } = require('../models');

module.exports = {
    async getGroup({params}, res) {
        const groupData = await Group.findOne({ title: params.title });

        if(!groupData) {
            return res.status(400).json({ message: 'No group found with this title!' });
        };

        res.json(groupData);  
    },
    async createGroup({ body }, res) {
        const groupData = await Group.create(body);

        if(!groupData) {
            return res.status(400).json({ message: 'Something went wrong!' });
        };

        res.json(groupData);
    },
    async groupJoinRequest({ user, body }, res) {
        const groupData = await GroupRequest.create(
            {
                requester: user.username,
                group: body.group,
                status: 1
            }
        );

        if(!groupData) {
            return res.status(400).json({ message: 'Something went wrong!' });
        };

        res.json(groupData);
    }
}