const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumTopicSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 64
    },
    slug: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 2500,
        minLength: 3
    },
    forumCategory: {
        type: Schema.Types.ObjectId,
        ref: 'ForumCategory'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ForumTopic', forumTopicSchema);
