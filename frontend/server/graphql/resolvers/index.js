module.exports.portfolioQueries = {
    portfolio: (root, {id}, ctx) => {
        return ctx.models.Portfolio.getById(id)
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll({})
    },
};

module.exports.authQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx)
    },
};

module.exports.portfolioMutations = {
    createPortfolio: async (root, {input}, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.createOne(input);
        return createdPortfolio;
    },

    updatePortfolio: async (root, {id, input}, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(id , input);
        return updatedPortfolio
    },

    deletePortfolio: async (root, {id}, ctx) => {
        await ctx.models.Portfolio.findAndDelete(id);
        return id;
    }
};

module.exports.userMutations = {
    signUp: async (root, { input }, ctx) => {
        const registeredUser = await ctx.models.User.signUp(input);
        return registeredUser._id
    },

    signIn: async (root, { input }, ctx) => {
        return ctx.models.User.signIn(input, ctx);
    },

    signOut: async (root, args, ctx) => {
        return ctx.models.User.signOut(ctx);
    }
};



