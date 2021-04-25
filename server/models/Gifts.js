const { Schema, model } = require('mongoose');

const giftsSchema = new Schema(
    {
        giftTitle: {
            type: String,
            required: true,
            trim: true
        }, 
        giftLink: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        groupId: {
            type: Number,
            required: true
        },
        isTaken: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Gifts = model('Gifts', giftsSchema);

module.exports = Gifts;
