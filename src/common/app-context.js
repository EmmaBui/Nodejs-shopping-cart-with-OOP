class AppContext {
    #db;
    #sequelize;
    #tokenJWT;

    constructor(db, sequelize, tokenJWT) {
        this.#db = db;
        this.#sequelize = sequelize;
        this.#tokenJWT = tokenJWT;
    }

    get getDB(){
        return this.#db;
    }

    get getTokenJWT(){
        return this.#tokenJWT;
    }

    get getSequelize(){
        return this.#sequelize;
    }
}

module.exports = AppContext