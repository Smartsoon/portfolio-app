class ForumCategory {
    constructor(model) {
        this.Model = model;
    }
    getAll() {
        return this.Model.find({})
    }

    getCategoryBySlug(slug) {
        return this.Model.findOne({slug})
            .populate('user')
    }
}

module.exports = ForumCategory;
