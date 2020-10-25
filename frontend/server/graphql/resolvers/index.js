module.exports.authQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx)
    },
};

module.exports.userMutations = {
    signUp: async (root, {input}, ctx) => {
        const registeredUser = await ctx.models.User.signUp(input);
        return registeredUser._id
    },

    signIn: async (root, {input}, ctx) => {
        return ctx.models.User.signIn(input, ctx);
    },

    signOut: async (root, args, ctx) => {
        return ctx.models.User.signOut(ctx);
    }
};


module.exports.portfolioQueries = {
    portfolio: (root, {id}, ctx) => {
        return ctx.models.Portfolio.getById(id)
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll({})
    },
    userPortfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAllUserPortfolios({})
    },
};

module.exports.portfolioMutations = {
    createPortfolio: async (root, {input}, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.createOne(input);
        return createdPortfolio;
    },

    updatePortfolio: async (root, {id, input}, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(id, input);
        return updatedPortfolio
    },

    deletePortfolio: async (root, {id}, ctx) => {
        await ctx.models.Portfolio.findAndDelete(id);
        return id;
    }
};


module.exports.forumQueries = {
    forumCategories: (root, args, ctx) => {
        return ctx.models.ForumCategory.getAll({})
    },

    // забираем из аргументов (которые нужно будет указать при получении данных с фронта (указать нужно будет slug)) category
    topicsByCategory: async (root, {category}, ctx) => {
        // засовываем slug в функцию поиска категории (ищется в можели и возвращает id категории)
        const forumCategory = await ctx.models.ForumCategory.getCategoryBySlug(category);
        if (!forumCategory) {
            return null
        }
        // находим в базе топики по нужной категории
        // если слаг присутствует
        return ctx.models.ForumTopic.getAllByCategory(forumCategory._id)

        // else {
        //     // если отсуствует
        //     return ctx.models.ForumTopic.getAllByCategory(id)
        // }
    },

    topicBySlug: (root, {slug}, ctx) => {
        return ctx.models.ForumTopic.getBySlug(slug)
    },

    postsByTopic: async (root, {slug, pageNum, pageSize}, ctx) => {
        const topic = await ctx.models.ForumTopic.getBySlug(slug);

        if (!topic) {
            return null
        }

        return ctx.models.Post.getAllByTopic(topic, pageNum, pageSize)
    }
};

module.exports.forumMutations = {
    createTopic: async (root, {input}, ctx) => {
        const category = await ctx.models.ForumCategory.getCategoryBySlug(input.forumCategory);
        input.forumCategory = category._id;
        const topic = await ctx.models.ForumTopic.create(input);
        return topic
    },

    createPost: async (root, {input}, ctx) => {
        const post = await ctx.models.Post.create(input);
        return post
    }
};





