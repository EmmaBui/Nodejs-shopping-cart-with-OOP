const UserRepository = require('../repositories/user')
const AuthenService = require('../services/authen')
const MyError = require('../common/error')

// Authorize user
module.exports.authorize = (appContext) => {
    return async (req, res, next) => {
        try {            
            let token;
            // if (req.cookies.token) {
            //   token = req.cookies.token;
            // }
            const authHeader = req.headers['authorization']
            token = authHeader && authHeader.split(' ')[1]
            if (!token) throw MyError.unauthorized(`Authorized Middleware`, "Token is not found!" );

            const tokenService = appContext.getTokenJWT;
            const models = appContext.getDB;
            const repository = new UserRepository(models);
            const service = new AuthenService(repository);

            const user = await service.authorized(token, tokenService);

            req.currentUser = {
                id: user.id,
                role : user.role
            };
            next();
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`Authorized Middleware`, `Unauthorized.`, err));
        }
    }
}

// Authorize role
module.exports.authorizeAdmin = (...roles) => {
    return async (req, res, next) => {
        try {                                      
            if (!roles.includes(req.currentUser.role)) {
                return next(MyError.unauthorized(`Authorized Middleware`, `Unauthorized, Role ${req.currentUser.role} cannot access this route`));
            }
            next();
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`Authorized Middleware`, `Unauthorized.`, err));
        }
    }
}