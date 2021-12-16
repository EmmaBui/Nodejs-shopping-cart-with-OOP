const express = require("express");
const router = express.Router();
const authenController = require("../controllers/authen");
const shopController = require("../controllers/shop");
const userController = require("../controllers/user");
const productController = require("../controllers/product");
const middlewareAuthorize = require("../middleware/authorize");

module.exports = function setupRouter(appContext) {
    // Auth
    router.post("/auth/signup", authenController.signup(appContext));
    router.post("/auth/login", authenController.login(appContext));
    router.get("/auth/logout", authenController.logout(appContext));

    // Product
    router.get("/product", productController.getAll(appContext));
    router.get("/product/:id", productController.getById(appContext));
    router.post("/product", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), productController.create(appContext));
    router.put("/product/:id", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), productController.update(appContext));
    router.delete("/product/:id", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), productController.delete(appContext));
    
    // Shop
    router.post("/shop/cart", middlewareAuthorize.authorize(appContext), shopController.addProductCart(appContext));
    router.get("/shop/cart", middlewareAuthorize.authorize(appContext), shopController.getCart(appContext));
    router.delete("/shop/cart", middlewareAuthorize.authorize(appContext), shopController.deleteProductCart(appContext));
    router.get("/shop/orders", middlewareAuthorize.authorize(appContext), shopController.getOrders(appContext));
    router.post("/shop/orders", middlewareAuthorize.authorize(appContext), shopController.postOrders(appContext));

    //User
    router.get("/user", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), userController.getAll(appContext));
    router.get("/user/:id", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), userController.getById(appContext));
    router.post("/user", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), userController.create(appContext));
    router.put("/user/:id", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), userController.update(appContext));
    router.delete("/user/:id", middlewareAuthorize.authorize(appContext), middlewareAuthorize.authorizeAdmin('admin'), userController.delete(appContext));
   
    return router;
}
