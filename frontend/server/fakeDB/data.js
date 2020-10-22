const mongoose = require('mongoose');
const moment = require('moment');

const userId = mongoose.Types.ObjectId();
const userId2 = mongoose.Types.ObjectId();

const forumId = mongoose.Types.ObjectId();
const forumId2 = mongoose.Types.ObjectId();
const forumId3 = mongoose.Types.ObjectId();

const topicId = mongoose.Types.ObjectId();

const postId = mongoose.Types.ObjectId();
const postId2 = mongoose.Types.ObjectId();
const postId3 = mongoose.Types.ObjectId();
const postId4 = mongoose.Types.ObjectId();

const post1CreatedAt = moment().subtract(7, 'days');
const post2CreatedAt = moment(post1CreatedAt).add(1, 'days');
const post3CreatedAt = moment(post2CreatedAt).add(1, 'days');
const post4CreatedAt = moment(post3CreatedAt).add(1, 'days');

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
    posts: [
        {
            _id: postId,
            content: 'Hey there how are you ?',
            slug: 'md43',
            fullSlug: post1CreatedAt.toISOString() + ':md43',
            topic: topicId,
            user: userId,
            createdAt: post1CreatedAt
        },
        {
            _id: postId2,
            content: 'What do you think about this?',
            slug: 'md59',
            fullSlug: post2CreatedAt.toISOString() + ':md59',
            topic: topicId,
            user: userId2,
            createdAt: post2CreatedAt
        },
        {
            _id: postId3,
            content: 'I think its nice (:',
            slug: 'md59/md79',
            fullSlug: post2CreatedAt.toISOString() + ':md59' + '/' + post3CreatedAt.toISOString() + ':md79',
            topic: topicId,
            user: userId,
            parent: postId2,
            createdAt: post3CreatedAt
        },
        {
            _id: postId4,
            content: 'Good to hear that!',
            slug: 'md59/md79/md89',
            fullSlug: post2CreatedAt.toISOString() + ':md59' + '/' + post3CreatedAt.toISOString() + ':md79' + '/' + post4CreatedAt.toISOString() + ':md89',
            topic: topicId,
            user: userId2,
            parent: postId3,
            createdAt: post4CreatedAt
        },
    ]
};

module.exports = data;
