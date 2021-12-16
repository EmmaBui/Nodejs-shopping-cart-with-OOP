const MyError = require('../common/error');

class BaseRepository {
    constructor(table, models) {
        this.table = table;
        this.tableName = this.table.tableName;
        this.models = models;
    }

    getAll(page, limit, fields) {
        try {
            const offset = (page - 1) * limit;
            return this.table.findAndCountAll({
                attributes: fields,
                offset: offset,
                limit: limit
            });
        } catch (error) {
            throw MyError.cannotListEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    getOne(conditions, fields, include = null) {
        try {
            return this.table.findOne({
                attributes: fields,
                where: conditions,
                include: include
            });
        } catch (error) {
            throw MyError.cannotGetEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    getById(id, fields, include = null) {
        try {
            return this.table.findByPk(id, {
                attributes: fields,
                include: include
            });
        } catch (error) {
            throw MyError.cannotGetEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    addItem(data, fields = null,) {
        try {
            delete data.id;
            delete data.createdAt;
            delete data.updatedAt;

            return this.table.create(data, {
                fields: fields,
                validate: true
            });
        } catch (error) {
            throw MyError.cannotCreateEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    updateItem(data, conditions, fields = null) {
        try {
            delete data.id;
            delete data.createdAt;
            delete data.updatedAt;

            return this.table.update(data, {
                where: conditions,
                fields: fields,
                validate: true
            });
        } catch (error) {
            throw MyError.cannotUpdateEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

    deleteItem(conditions, hard = false) {
        try {
            return this.table.destroy({
                where: conditions,
                force: hard
            });;
        } catch (error) {
            throw MyError.cannotDeleteEntity(`${this.tableName} Repository`, this.tableName, error);
        }
    }

}

module.exports = BaseRepository