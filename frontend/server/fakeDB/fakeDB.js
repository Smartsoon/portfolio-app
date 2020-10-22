const { portfolios, users, forumCategories, topics, posts } = require('./data');
const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');
const ForumCategory = require('../db/models/forumCategory');
const ForumTopic = require('../db/models/forumTopics');
const Post = require('../db/models/post');

class FakeDB {
    async clean() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
        await ForumTopic.deleteMany({});
        await Post.deleteMany({});
    }

    async addData() {
        await User.create(users);
        await Portfolio.create(portfolios);
        await ForumCategory.create(forumCategories);
        await ForumTopic.create(topics);
        await Post.create(posts);
    }

    async populate() {
        await this.clean();
        await this.addData();
    }
}

module.exports = new FakeDB();
