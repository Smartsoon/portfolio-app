const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
const moment= require('moment');

class Post {
    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }



    async getAllByTopic(topic, pageNum = 1, pageSize = 10) {

        const skips = pageSize * (pageNum - 1);

        const count = await this.Model.countDocuments({topic});

        const posts = await this.Model
            .find({topic})
            .sort('createdAt')
            .skip(skips)
            .limit(pageSize)
            .populate('user')
            .populate('topic')
            .populate({path: 'parent', populate: 'user'});

        return { posts, count }
    }

    async create(post) {
        if (!this.user) {
            throw new Error('You are now authenticated')
        }

        post.user = this.user;

        const createdAt = moment().toISOString();
        const slugPart = uniqueSlug();
        const fullPartSlug = createdAt + ':' + slugPart;
        post.createdAt = createdAt;



        if(post.parent) {
            const parent = await this.Model.findById(post.parent);
            post.slug = parent.slug + '/' + slugPart;
            post.fullSlug = parent.fullSlug + '/' + fullPartSlug;
        } else {
            post.slug = slugPart;
            post.fullSlug = fullPartSlug;
        }

        const createdPost = await this.Model.create(post);
        return this.Model
            .findById(createdPost._id)
            .populate('user')
            .populate('topic')
            .populate({path: 'parent', populate: 'user'})
    }
}

module.exports = Post;
