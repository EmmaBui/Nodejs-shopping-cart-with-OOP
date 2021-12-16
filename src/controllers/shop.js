const Repository = require('../repositories/shop')
const Service = require('../services/shop')
const MyResponse = require('../common/response')
const MyError = require('../common/error')
const tableName = "Shop";

//Get cart
module.exports.getCart = (appContext) => {
    return async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            
            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository, currentUser);

            const data = await service.getCart();

            next(MyResponse.newSuccessResponse(`${tableName} Controller`, `Get cart successful.`, data))
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.cannotGetEntity(`${tableName} Controller`, `Cart`, err));
        }
    }
}

//Add product to cart
module.exports.addProductCart = (appContext) => {
    return async (req, res, next) => {
        try {
            const {productId} = req.body;
            const currentUser = req.currentUser;
            
            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository, currentUser);

            const data = await service.addProductToCart(productId);

            next(MyResponse.newSuccessResponse(`${tableName} Controller`, `Add product to cart successful.`, data))
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`${tableName} Controller`, `Unauthorized!`, err));
        }
    }
}

//Delete product from cart
module.exports.deleteProductCart = (appContext) => {
    return async (req, res, next) => {
        try {
            const {productId} = req.body;
            const currentUser = req.currentUser;
            
            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository, currentUser);

            const data = await service.deleteProductCart(productId);

            next(MyResponse.newSuccessResponse(`${tableName} Controller`, `Delete product from cart successful.`, data))
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`${tableName} Controller`, `Unauthorized!`, err));
        }
    }
}

//Get orders
module.exports.getOrders = (appContext) => {
    return async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            
            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository, currentUser);

            const data = await service.getOrders();

            next(MyResponse.newSuccessResponse(`${tableName} Controller`, `Get list orders successful.`, data))
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`${tableName} Controller`, `Unauthorized!`, err));
        }
    }
}

//Create order
module.exports.postOrders = (appContext) => {
    return async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            
            const models = appContext.getDB;
            const repository = new Repository(models);
            const service = new Service(repository, currentUser);

            const data = await service.postOrders();

            next(MyResponse.newSuccessResponse(`${tableName} Controller`, `Create order successful.`, data))
        } catch (err) {
            if (err instanceof MyError.MyError) next(err);
            else next(MyError.unauthorized(`${tableName} Controller`, `Unauthorized!`, err));
        }
    }
}
