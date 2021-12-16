const {Sequelize, DataTypes, Model} = require('sequelize');
const Models = require('./init-models')

module.exports = (config) => {
    try {
        const sequelize = new Sequelize(config.database, config.user, config.password, {
            host: config.server,
            dialect: "mysql",
        });

        const models = Models(sequelize, DataTypes, Model);

        return {
            models: models,
            sequelize: sequelize,
        };
    } catch (error) {
        throw error;
    }
}