const BaseModel = require('./BaseModel');

class ForumCategory extends BaseModel {

    getAll() {
        return this.Model.find({})
    }

    getCategoryBySlug(slug) {
        return this.Model.findOne({slug})
            .populate('user')
    }
}

module.exports = ForumCategory;
