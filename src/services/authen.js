const MyError = require('../common/error');
const Hash = require('../helper/hash');
const config  = require('../config');

class AuthenService {
    constructor(repository) {
        this.repository = repository;
        this.tableName = this.repository.tableName;
    }

    async signup(item) {
        try {
            const {
                name: itemName,
                email: itemEmail,
                password: itemPassword
            } = item;

            const fields = ['id', 'name', 'email', 'password', 'role'];
            const userExist = await this.repository.getOne({ email: itemEmail.toLowerCase() }, fields);

            if (userExist) throw MyError.badRequest(`Authentication Service`, "User is already exist!");

            const newUser = await this.repository.addItem(item);

            await newUser.createCart();

            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.badRequest(`Authentication Service`, `Sign up fail!`, err);
        }
    }

    async login(item, tokenService) {
        try {
            const {
                email: itemEmail,
                password: itemPassword
            } = item;

            const fields = ['id', 'name', 'email', 'password', 'role'];
            const userExist = await this.repository.getOne({ email: itemEmail.toLowerCase() }, fields);

            if (!userExist) throw MyError.badRequest(`Authentication Service`, "User is not found!");

            const checkPassword = await Hash.compareHash(itemPassword, userExist.password);

            if (!checkPassword) throw MyError.badRequest(`Authentication Service`, "Invalid password!");

            const data = {
                id: userExist.id,
                role: userExist.role
            }

            const accessToken = tokenService.sign(data, userExist.email, config.tokenJWT.expiresIn);

            const options = {
                expires: new Date(
                  Date.now() + config.cookieExpiresIn * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            };
            
            if (config.NODE_ENV === 'production') {
                options.secure = true;
            }

            return {
                accessToken: accessToken,
                options: options,
                user: {
                    id: userExist.id,
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role
                }

            }
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.unauthorized(`Authentication Service`, `Unauthorized.`, err);
        }
    }

    async authorized(token, tokenService) {
        try {
            const decoded = tokenService.verify(token);
            const { id: userId } = decoded;

            const userExist = await this.repository.getById(userId, ['id', 'role'], null, true);

            if (!userExist) throw MyError.badRequest(`Authentication Service`, "User is not found!");
            return userExist;
        } catch (err) {
            if (err instanceof MyError.MyError) throw err;
            throw MyError.cannotGetEntity(`Authentication Service`, this.tableName, err);
        }
    }

}

module.exports = AuthenService