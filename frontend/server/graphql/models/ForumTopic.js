class ForumTopic {
    constructor(model) {
        this.Model = model;
    }
    getAllByCategory(forumCategory) {
        return this.Model
            .find({forumCategory})
            .populate('user')
            .populate('forumCategory')
    }
}

module.exports = ForumTopic;
