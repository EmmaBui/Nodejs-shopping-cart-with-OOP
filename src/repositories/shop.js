const BaseRepository = require('./base');
const MyError = require('../common/error');

class ShopRepository extends BaseRepository {
    constructor(models) {
        super(models.User, models);
    }

    getUser(userId) {
        try {
            return this.models.User.findOne({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            throw MyError.cannotGetEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    getProduct(productId) {
        try {
            return this.models.Product.findOne({
                where: {
                    id: productId
                }
            });
        } catch (error) {
            throw MyError.cannotGetEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }
}
module.exports = ShopRepository