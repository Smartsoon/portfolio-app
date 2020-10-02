const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    title: { type: String, required: true, maxLength: 120 },
    company: { type: String, required: true, maxLength: 64 },
    companyWebsite: { type: String, required: true, maxLength: 100 },
    location: { type: String, required: true, maxLength: 64 },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true, minLength: 5 },
    startDate: { type: Date, required: true },
    endDate: Date,
    createdAt: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
