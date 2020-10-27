const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
const BaseModel = require('./BaseModel');

class ForumTopic extends BaseModel {

    getBySlug(slug) {
        return this.Model
            .findOne({slug})
            .populate('user')
            .populate('forumCategory')
    }

    getAllByCategory(forumCategory) {
        return this.Model
            .find({forumCategory})
            .populate('user')
            .populate('forumCategory')
    }

    async _create(data) {
        const createdTopic = await this.Model.create(data);
        return this.Model.findById(createdTopic._id).populate('user').populate('forumCategory')
    }

    async create(data) {
        if (!this.user) {
            throw new Error('Not Authorized!')
        }
        data.user = this.user;
        data.slug = slugify(data.title, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
        });

        let topic;
        try {
            topic = await this._create(data);
            return topic
        } catch (e) {
            if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
                const randomSlug = uniqueSlug();
                data.slug += `-${randomSlug}`;
                topic = this._create(data);
                return topic
            }

            return null
        }
    }

    async getRandoms(limit) {
        const query = await super.getRandoms(limit);
        return query().populate('user')
    }
}

module.exports = ForumTopic;
