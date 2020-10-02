const { portfolios, users } = require('./data');
const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');

class FakeDB {
    async clean() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
    }

    async addData() {
        await User.create(users);
        await Portfolio.create(portfolios);
    }

    async populate() {
        await this.clean();
        await this.addData();
    }
}

module.exports = new FakeDB();
