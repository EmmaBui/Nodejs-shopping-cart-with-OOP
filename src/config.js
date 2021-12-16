'use strict';
const dotenv = require('dotenv');
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
// PORT
const PORT = process.env.PORT || "3000";
// DATABASE
const SQL_USER = process.env.SQL_USER || "root";
const SQL_PASSWORD = process.env.SQL_PASSWORD || "mypassword123";
const SQL_DATABASE = process.env.SQL_DATABASE || "project123";
const SQL_SERVER = process.env.SQL_SERVER ||"localhost";
// TOKEN 
const SUBJECT = process.env.SUBJECT || "abc";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "mytokensecret";
const EXPIRES_IN = process.env.EXPIRES_IN || "1h";
//COOKIES
const JWT_COOKIE_EXPIRE = process.env.EXPIRES_IN || "30";


module.exports = {
    NODE_ENV: NODE_ENV,
    port: PORT,
    database: {
        user: SQL_USER,
        password: SQL_PASSWORD,
        database: SQL_DATABASE,
        server: SQL_SERVER
    },
    tokenJWT: {
        subject: SUBJECT,
        token_secret: TOKEN_SECRET,
        expiresIn: EXPIRES_IN,
    },
    cookieExpiresIn: JWT_COOKIE_EXPIRE
};

