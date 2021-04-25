const { Schema, model } = require('mongoose');
const userSchema = require('./User');

const groupSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        username: {
            type: String, 
            required: true
        },
        users: [userSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

groupSchema.virtual('userCount').get(function() {
    return this.users.length;
});

const Group = model('Group', groupSchema);

module.exports = Group;