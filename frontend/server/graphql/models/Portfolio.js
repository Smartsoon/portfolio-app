const BaseModel = require('./BaseModel');

class Portfolio extends BaseModel{

    constructor(model, user) {
        super(model, user);
        this.rolesWrhits = [ 'admin', 'instructor', 'guest' ]
    }

    getAll() {
        return this.Model.find({})
    }

    getAllUserPortfolios() {
        return this.Model.find({user: this.user._id}).sort({startDate: 'desc'})
    }

    getById(id) {
        return this.Model.findById(id)
    }

    createOne(data) {
        if (!this.user) {
            throw new Error('Not Authorized!')
        }

        if (!this.rolesWrhits.includes(this.user.role)) {
            throw new Error('You dont have permissions to do that!')
        }

        data.user = this.user;
        return this.Model.create(data)
    }

    findAndUpdate(id, data) {
        return this.Model.findOneAndUpdate( { _id: id }, data, { new: true, runValidators: true } )
    }

    findAndDelete(id) {
        return this.Model.findOneAndRemove({ _id: id })
    }
}

module.exports = Portfolio;
