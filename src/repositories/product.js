const BaseRepository = require('./base');
const defaultFields = ['id', 'title','price', 'description'];

class ProductRepository extends BaseRepository {
    constructor(models) {
        super(models.Product, models);
    }

    getAll(page, limit, fields) {
        if (!fields) fields = defaultFields;
        return super.getAll(page, limit, defaultFields);
    }

    getById(id, fields) {
        if (!fields) fields = defaultFields;
        return super.getById(id, fields);
    }

    addItem(data) {
        const fields = ['title','price', 'description'];
        return super.addItem(data, fields);
    }

    updateItem(data, conditions) {
        const fields = ['title','price', 'description'];
        return super.updateItem(data, conditions, fields);
    }

    deleteItem(conditions) {
        return super.deleteItem(conditions, true);
    }

}
module.exports = ProductRepository