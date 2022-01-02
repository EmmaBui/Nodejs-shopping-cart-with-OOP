const BaseService = require('../services/base');
const MyError = require('../common/error');

class ShopService extends BaseService {
    constructor(repository, currentUser) {
        super(repository, currentUser);
    }
    async getCart() {
        try {
            const currentUser = this.currentUser;
            const user = await this.repository.getUser(currentUser.id);
            const cart = await user.getCart();
            const cartProduct = await cart.getProducts();

            return {
                cartProduct: cartProduct
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotGetEntity(`${this.tableName} Service`, `Cart`, err);
        }
    }

    async addProductToCart(itemId) {
        try {
            const { id } = itemId;

            const currentUser = this.currentUser;
            const user = await this.repository.getUser(currentUser.id);
            const cart = await user.getCart();
            const existProducts = await cart.getProducts({ where: { id: itemId} });
            let product;
            let newQuantity = 1;
            if (existProducts.length > 0) {
                product = existProducts[0];
            }
            if (product) {
                const oldQuantity = product.CartItem.quantity;
                newQuantity = oldQuantity + 1;
            }

            const newAddProduct = await this.repository.getProduct(itemId);

            cart.addProduct(newAddProduct, { through: { quantity: newQuantity, price: newAddProduct.price }});

            return {
                addedProduct: newAddProduct
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.unauthorized(`${this.tableName} Service`, `Unauthorized!`, err)
        }
    }

    async deleteProductCart(itemId) {
        try {
            const { id } = itemId;

            const currentUser = this.currentUser;

            const user = await this.repository.getUser(currentUser.id);
            const cart = await user.getCart();
            const existProducts = await cart.getProducts({ where: { id: itemId} });
            let product;

            if (existProducts.length === 0) {
                throw MyError.badRequest(`Shop Service`, `Cannot find product with id = ${itemId} in cart`);
            }
            else if (existProducts.length > 0) {
                product = existProducts[0];
            }

            product.CartItem.destroy();

            return {
                deletedProductId: product.id 
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.unauthorized(`${this.tableName} Service`, `Unauthorized!`, err);
        }
    }

    async getOrders() {
        try {
            const currentUser = this.currentUser;

            const user = await this.repository.getUser(currentUser.id);

            const orders = await user.getOrders({include: ['Products']});

            return {
                orders: orders
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.unauthorized(`${this.tableName} Service`, `Unauthorized!`, err);
        }
    }

    async postOrders() {
        try {
            const currentUser = this.currentUser;

            const user = await this.repository.getUser(currentUser.id);
            const cart = await user.getCart();
            const existProducts = await cart.getProducts();
            let product;
            if (existProducts.length === 0) {
                throw MyError.badRequest(`Shop Service`, `Cannot find product in cart`);
            }
            const order = await user.createOrder();
            
            const orderDetail = await order.addProducts(
                existProducts.map(product => { 
                    product.OrderDetail = { quantity: product.CartItem.quantity, price: product.CartItem.price };
                    return product;
                })
            );

            let total = 0;
            orderDetail.forEach(p => {
                total += p.quantity * p.price;
            });

            order.update({total: total}, { where : { id: order.id }})

            cart.setProducts(null)

            return {
                total: total,
                orderDetail: orderDetail
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.unauthorized(`${this.tableName} Service`, `Unauthorized!`, err);
        }
    }

}

module.exports = ShopService