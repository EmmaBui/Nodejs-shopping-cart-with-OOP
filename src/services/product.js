const BaseService = require('./base');
const MyError = require('../common/error');

class ProductService extends BaseService {
    constructor(repository) {
        super(repository);
    }

    async getAll(page, limit) {
        try {             
            const {count, rows} = await this.repository.getAll(page, limit);
            return {
                total: count,
                data: rows
            };
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotListEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async getById(productId) {
        try {
            const product = await this.repository.getById(productId);     
            if (!product) throw MyError.badRequest(`${this.tableName} Service`, "Product is not found!");
            return product;
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotGetEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async create(data) {
        try {
            const createdProduct = await this.repository.addItem(data);;
            return {
                createdProduct: createdProduct
            };
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotCreateEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async update(productId, data) {
        try {
            const productExist = await this.repository.getById(productId);
            if (!productExist) throw MyError.badRequest(`${this.tableName} Service`, "Product is not found!");

            await this.repository.updateItem(data, { id: productId });
            const updatedProduct = await this.repository.getById(productId);
            return {
                updatedProduct: updatedProduct
            };
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotUpdateEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async delete(productId) {
        try {
            const productExist = await this.repository.getById(productId)
            if (!productExist ) throw MyError.badRequest(`${this.tableName} Service`, "Product is not found!");

            await this.repository.deleteItem({ id: productId });
            return {
                id: productId
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotDeleteEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }
}

module.exports = ProductService