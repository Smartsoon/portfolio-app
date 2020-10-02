const mongoose = require('mongoose');

const userId = mongoose.Types.ObjectId();
const userId2 = mongoose.Types.ObjectId();

const data = {
    users: [
        {
            _id: userId,
            avatar: 'https://html5css.ru/howto/img_avatar.png',
            email: 'test@gmail.com',
            name: 'tested',
            username: 'tested',
            password: 'tested12',
            info: 'ertertert'
        },
        {
            _id: userId2,
            email: 'kostia@gmail.com',
            name: 'Kostia',
            username: 'Kostia',
            password: 'qwert12345',
            role: 'admin',
            info: '123123123',
        }
    ],

    portfolios: [
        {
            title: 'Job in Netcentric',
            company: 'Netcentric',
            companyWebsite: 'www.google.com',
            location: 'Spain, Barcelona',
            jobTitle: 'Engineer',
            description: 'Doing something, programing....',
            startDate: '01/01/2014',
            endDate: '01/01/2016',
            user: userId
        },
        {
            title: 'Job in Siemens',
            company: 'Siemens',
            companyWebsite: 'www.google.com',
            location: 'Slovakia, Kosice',
            jobTitle: 'Software Engineer',
            description: 'Responsoble for parsing framework for JSON medical data.',
            startDate: '01/01/2011',
            endDate: '01/01/2013',
            user: userId
        },
        {
            title: 'Work in USA',
            company: 'WhoKnows',
            companyWebsite: 'www.google.com',
            location: 'USA, Montana',
            jobTitle: 'Housekeeping',
            description: 'So much responsibility....Overloaaaaaad',
            startDate: '01/01/2010',
            endDate: '01/01/2011',
            user: userId
        }
    ]
};

module.exports = data;
