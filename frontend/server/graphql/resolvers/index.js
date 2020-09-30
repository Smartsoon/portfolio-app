const Portfolio = require('../../db/models/portfolio');

// const data = {
//     portfolios: [
//         {
//             _id: "sad87da79",
//             title: 'Job in Netcentric',
//             company: 'Netcentric',
//             companyWebsite: 'www.google.com',
//             location: 'Spain, Barcelona',
//             jobTitle: 'Engineer',
//             description: 'Doing something, programing....',
//             startDate: '01/01/2014',
//             endDate: '01/01/2016'
//         },
//         {
//             _id: "da789ad1",
//             title: 'Job in Siemens',
//             company: 'Siemens',
//             companyWebsite: 'www.google.com',
//             location: 'Slovakia, Kosice',
//             jobTitle: 'Software Engineer',
//             description: 'Responsoble for parsing framework for JSON medical data.',
//             startDate: '01/01/2011',
//             endDate: '01/01/2013'
//         },
//         {
//             _id: "sadcxv9",
//             title: 'Work in USA',
//             company: 'WhoKnows',
//             companyWebsite: 'www.google.com',
//             location: 'USA, Montana',
//             jobTitle: 'Housekeeping',
//             description: 'So much responsibility....Overloaaaaaad',
//             startDate: '01/01/2010',
//             endDate: '01/01/2011'
//         }
//     ]
// };

module.exports.portfolioQueries = {
    portfolio: (root, {id}, ctx) => {
        return ctx.models.Portfolio.getById(id)
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll({})
    },


};

module.exports.portfolioMutations = {
    // createPortfolio: (root, {input}) => {
    //     const _id = require('crypto').randomBytes(10).toString('hex');
    //     const newPortfolio = {
    //         ...input
    //     };
    //     newPortfolio._id = _id;
    //     data.portfolios.push(newPortfolio);
    //     return newPortfolio;
    // },
    createPortfolio: async (root, {input}, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.createOne(input);
        return createdPortfolio;
    },
    // updatePortfolio: (root, {id, input}) => {
    //     const index = data.portfolios.findIndex(portfolio => portfolio._id === id);
    //     const oldPortfolio = data.portfolios[index];
    //     const updatedPortfolio = {
    //         ...oldPortfolio,
    //         ...input
    //     };
    //     data.portfolios[index] = updatedPortfolio;
    //     return updatedPortfolio
    // },
    updatePortfolio: async (root, {id, input}, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(id , input);
        return updatedPortfolio
    },
    // deletePortfolio: (root, {id}) => {
    //     const index = data.portfolios.findIndex(portfolio => portfolio._id === id);
    //     data.portfolios.splice(index, 1);
    //     return id;
    // },
    deletePortfolio: async (root, {id}, ctx) => {
        await ctx.models.Portfolio.findAndDelete(id);
        return id;
    }
};
