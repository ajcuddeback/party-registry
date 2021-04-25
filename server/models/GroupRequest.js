const { Schema, model } = require('mongoose');

const groupRequestSchema = new Schema(
    {
        requester: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true,
            default: 1
        }
    }
);

const GroupRequest = model('GroupRequest', groupRequestSchema);

module.exports = GroupRequest;