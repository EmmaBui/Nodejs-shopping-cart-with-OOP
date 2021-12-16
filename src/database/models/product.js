module.exports = (sequelize, DataTypes, Model) => {
    class Product extends Model {
    }
    Product.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: false
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            noUpdate: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
        sequelize
    })
    return Product;
}