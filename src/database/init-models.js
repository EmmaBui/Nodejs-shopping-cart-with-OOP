module.exports = (sequelize, DataTypes, Model) => {
    const User = require("./models/user")(sequelize, DataTypes, Model);
    const Product = require("./models/product")(sequelize, DataTypes, Model);
    const Cart = require("./models/cart")(sequelize, DataTypes, Model);
    const CartItem = require("./models/cart-item")(sequelize, DataTypes, Model);
    const Order = require("./models/order")(sequelize, DataTypes, Model);
    const OrderDetail = require("./models/order-detail")(sequelize, DataTypes, Model);

    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User);
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });
    Order.belongsTo(User);
    User.hasMany(Order);
    Order.belongsToMany(Product, { through: OrderDetail });
    Product.belongsToMany(Order, { through: OrderDetail });

    return {
        User,
        Product,
        Cart,
        CartItem,
        Order,
        OrderDetail
    }
}
