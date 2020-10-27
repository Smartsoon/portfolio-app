const BaseModel = require('./BaseModel');

class User extends BaseModel {

    async signUp(signUpData) {
        if(signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password field data must be the same as confirmation field data!')
        }

        if (!signUpData.avatar) {
            signUpData.avatar = 'https://annam-finefood.com/wp-content/uploads/2016/09/no-avatar.png'
        }

        try {
            return await this.Model.create(signUpData)
        } catch(error) {
            if (error.code && error.code === 11000) {
                throw new Error('User with provided email already exist')
            }
            throw error
        }
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
            // console.log('iaAuth', ctx.isAuthenticated());
            // console.log('User', ctx.getUser());
            ctx.logout();
            // console.log('iaAuth', ctx.isAuthenticated());
            // console.log('User', ctx.getUser());
            return true
        } catch (error) {
            return false
        }
    }

    async getAuthUser(ctx) {
        if (ctx.isAuthenticated()) {
            const user = ctx.getUser();
            return user
        } else {
            return null
        }
    }
}

module.exports = User;
