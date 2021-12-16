const AppContext = require("./common/app-context");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

const CONFIG = require('./config');
const responseErrorMiddleware = require("./middleware/res-err");
const MyError = require('./common/error');
const routes = require("./routes");
const Sequelize = require('./database/sequelize');

const TokenService = require('./common/token');

module.exports = async () => {
    try {
        // DB
        const {models, sequelize} = Sequelize(CONFIG.database);
        
        // Check connect to DB
        await sequelize.authenticate(),

        // Create DB
        await sequelize.sync();
        //await sequelize.sync({force: true});

        // App Context
        const appContext = new AppContext(
            models,
            sequelize,
            new TokenService(
                CONFIG.tokenJWT.token_secret,
                {
                    subject: CONFIG.tokenJWT.subject,
                    expiresIn: CONFIG.tokenJWT.expiresIn
                }
            ),
        );
        
        // body parse
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        //cookie parse
        app.use(cookieParser());
        // setup routes index
        app.use(routes(appContext));
        // handle response & error
        app.use(responseErrorMiddleware);
        // Start express server
        app.listen(CONFIG.port, () => {
            console.log(`Server started at http://localhost:${CONFIG.port}`);
        });
    } catch (err) {
        if (err instanceof MyError.MyError) console.log(err);
        console.log(MyError.badRequest("Setup Connection", "Can not setup connection with services.", err));
    }
}