const Hash = require('../../helper/hash');

module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model {
    }
    User.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1, 100]
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100]
            },
            set(value) {
                this.setDataValue('password', Hash.hashPassword(value))
            }
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "user"
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
        modelName: 'User'
    })
    return User;
}