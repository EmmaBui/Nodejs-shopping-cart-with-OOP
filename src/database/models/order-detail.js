module.exports = (sequelize, DataTypes, Model) => {
    class OrderDetail extends Model {
    }

    OrderDetail.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        sequelize,
        modelName: 'OrderDetail'
    })
    return OrderDetail;
}