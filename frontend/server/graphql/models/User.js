class User {
    constructor(model) {
        this.Model = model;
    }

    signUp(signUpData) {
        if(signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password field data must be the same as confirmation field data!')
        }

        return this.Model.create(signUpData)
    }

    async signIn(authData, ctx) {
        try {
            const user = await ctx.authenticate(authData);
            return user
        } catch (error) {
            return error
        }
    }

    signOut(ctx) {
        try {
            console.log('iaAuth', ctx.isAuthenticated());
            console.log('User', ctx.getUser());
            ctx.logout();
            console.log('iaAuth', ctx.isAuthenticated());
            console.log('User', ctx.getUser());
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = User;
