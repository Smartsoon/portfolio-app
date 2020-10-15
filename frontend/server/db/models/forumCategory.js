const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 64
    },
    subTitle: {
        type: String,
        required: true,
        maxLength: 100
    },
    slug: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ForumCategory', forumCategorySchema);
