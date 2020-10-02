const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: {
        type: String,
        default: 'https://annam-finefood.com/wp-content/uploads/2016/09/no-avatar.png'
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        index: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    name: {
        type: String,
        minLength: [6, 'Minimum length is 6 characters'],
    },
    username: {
        type: String,
        required: true,
        minLength: [6, 'Minimum length is 6 characters']
    },
    password: {
        type: String,
        maxLength: [32, 'Maximum length is 32 characters'],
        required: true
    },
    role: {
        enum: ['guest', 'admin', 'instructor'],
        type: String,
        required: true,
        default: 'guest'
    },
    info: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            next(err)
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                next(err)
            }
            user.password = hash;
            next()
        });
    });
});

userSchema.methods.validatePassword = function(password, validationCallback) {
    const user = this;
    bcrypt.compare(password, user.password, (error, isSuccess) => {
        if (error) {
            return validationCallback(error)
        }
        return validationCallback(null, isSuccess)
    })
};

module.exports = mongoose.model('User', userSchema);
