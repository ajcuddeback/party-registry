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
    },
    async getJoinRequests({ body }, res) {
        const groupData = await GroupRequest.find({
            group: body.group
        });

        if(!groupData) {
            return res.status(400).json({ message: 'No requests found at this group name!' });
        }

        res.json(groupData);
    },
    async groupResponseRequest({ body }, res) {
        const groupData = await GroupRequest.findOneAndUpdate(
            { requester: body.requester, group: body.group },
            { $set: { status: body.status } },
            { new: true }
        );

        res.json(groupData);
    }
}