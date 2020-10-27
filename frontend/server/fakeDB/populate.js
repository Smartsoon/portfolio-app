const mongoose = require('mongoose');
const config = require('../config/index');
const fakeDB = require('./fakeDB');


mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, async () => {
    console.log('Starting populating DB...');
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log('Populated!')
});
