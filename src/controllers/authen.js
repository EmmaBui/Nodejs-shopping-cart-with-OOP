const Repository = require('../repositories/user')
const Service = require('../services/authen')
const MyResponse = require('../common/response')
const MyError = require('../common/error')
const tableName = "Authentication";

//Sign up
module.exports.signup = (appContext) => {
    return async (req, res, next) => {
        try {
            const body = req.body;

            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository);

            const data = await service.signup(body);

            next(MyResponse.newSimpleResponse(`${tableName} Controller`, `Signup successfully!`, data));
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.badRequest(`${tableName} Controller`, `Sign up fail!`, err));
        }
    }
}

// Login
module.exports.login = (appContext) => {
    return async (req, res, next) => {
        try {
            const body = req.body;

            const tokenService = appContext.getTokenJWT;

            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository);

            const data = await service.login(body, tokenService);
            
            res.status(200).cookie('token', data.accessToken, data.options).json({message: `Login successfully`, accessToken: data.accessToken, user: data.user});
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`${tableName} Controller`, `Unauthorized!`, err));
        }
    }
}

// Logout
module.exports.logout = (appContext) => {
    return async (req, res, next) => {
        try {
            res.cookie('token', 'none', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true
            });
            
            res.status(200).json({
                success: true,
                data: {}
            });
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.badRequest(`${tableName} Controller`, `Logout fail!`, err));
        }
    }
}