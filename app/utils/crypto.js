const bcrypt = require('bcrypt');

class Crypto {
    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = bcrypt.hash(password, salt);
        return encryptPassword;
    }

    static async comparePasswords(password, passwordToCompare) {
        return await bcrypt.compare(password, passwordToCompare);
    }
}

module.exports = Crypto;