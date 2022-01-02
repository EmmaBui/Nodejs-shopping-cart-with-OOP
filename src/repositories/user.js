const BaseRepository = require('./base');
const defaultFields = ['name', 'email', 'role', 'createdAt', 'updatedAt'];

class UserRepository extends BaseRepository {
    constructor(models) {
        super(models.User, models);
    }

    getAll(page, limit, fields = null) {
        if (!fields){
            fields = defaultFields;
        }
        return super.getAll(page, limit, fields);
    }

    getById(id, fields = null, include = null) {
        if (!fields) fields = defaultFields;
        return super.getById(id, fields, include);
    }

    getOne(conditions, fields = null, include = null) {
        if (!fields) fields = defaultFields;
        return super.getOne(conditions, fields, include);
    }

    addItem(data) {
        const fields = ['name', 'email', 'password', 'role'];
        return super.addItem(data, fields);
    }

    updateItem(data, conditions) {
        const fields = ['name', 'email', 'password', 'role'];
        return super.updateItem(data, conditions, fields);
    }

    deleteItem(conditions) {
        return super.deleteItem(conditions, false);
    }
  
}

module.exports = UserRepository