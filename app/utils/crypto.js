const bcrypt = require('bcrypt');

class Crypto {

    Encrypt = {
        cryptPassword: (password) =>
            bcrypt.genSalt(10)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash),
    }          
}

module.exports = new Crypto;