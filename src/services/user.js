const BaseService = require('../services/base');
const MyError = require('../common/error');
const {Op} = require('sequelize');

class UserService extends BaseService {
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

    async getById(userId) {
        try {
            const user = await this.repository.getById(userId);
            if (!user) throw MyError.badRequest(`${this.tableName} Service`, "User is not found!");
            return user;
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotGetEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async create(data) {
        try {
            const where = { email: {[Op.eq]: data.email}};

            const userExist = await this.repository.getOne(where, ['id']);

            if (userExist) throw MyError.badRequest(`${this.tableName} Service`, "Email already exist!");

            const user = await this.repository.addItem(data);
            await user.createCart();
            const createdUser = await this.repository.getById(user.id, ["name", "email", "role", "createdAt"]);
            return {
                createdUser: createdUser
            };
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotCreateEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async update(userId, data) {
        try {
            const userExist = await this.repository.getById(userId);
            if (!userExist) throw MyError.badRequest(`${this.tableName} Service`, "User is not found!");

            await this.repository.updateItem(data, { id: userId });

            const updatedUser = await this.repository.getById(userId, ["name", "email", "role", "updatedAt"]);
            return {
                updatedUser: updatedUser
            };
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotUpdateEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }

    async delete(userId) {
        try {
            const userExist = await this.repository.getById(userId)
            if (!userExist ) throw MyError.badRequest(`${this.tableName} Service`, "User is not found!");

            await this.repository.deleteItem({ id: userId });
            return {
                deleteUserId: userId
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotDeleteEntity(`${this.tableName} Service`, this.tableName, err);
        }
    }
}

module.exports = UserService