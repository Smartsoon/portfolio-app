const mongoose = require('mongoose');

const userId = mongoose.Types.ObjectId();
const userId2 = mongoose.Types.ObjectId();

const forumId = mongoose.Types.ObjectId();
const forumId2 = mongoose.Types.ObjectId();
const forumId3 = mongoose.Types.ObjectId();

const topicId = mongoose.Types.ObjectId();

const data = {
    users: [
        {
            _id: userId,
            avatar: 'https://html5css.ru/howto/img_avatar.png',
            email: 'nesteemusic@gmail.com',
            name: 'Nestee',
            username: 'Nestee',
            password: 'nesteemusic@gmail.com',
            role: 'admin',
            info: 'ertertert'
        },
        {
            _id: userId2,
            email: 'kostia@gmail.com',
            name: 'Kostia',
            username: 'Kostia',
            password: 'qwert12345',
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
    ],
    forumCategories: [
        {
            _id: forumId,
            title: 'General Discussion',
            subTitle: 'Open any topic you want',
            slug: 'general-discussion'
        },
        {
            _id: forumId2,
            title: 'Job Requests',
            subTitle: 'Post here job opportunities',
            slug: 'job-requests'
        },
        {
            _id: forumId3,
            title: 'Developer Jokes',
            subTitle: 'Just funny developing stuff',
            slug: 'developer-jokes'
        }
    ],
    topics: [
        {
            _id: topicId,
            title: 'How to learn JS',
            slug: "how-to-learn-js",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumId,
            user: userId
        },
        {
            title: 'How to learn JAVA',
            slug: "how-to-learn-java",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumId,
            user: userId
        },
        {
            title: 'How to learn C++',
            slug: "how-to-learn-c++",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumId2,
            user: userId
        }
    ],
};

module.exports = data;
