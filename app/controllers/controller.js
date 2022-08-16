const User = require('../models/User');
const bcrypt = require('bcrypt');

  class mesa {

    async index(req, res) {
        const users = await User.findAll();
        res.send(users);
    };

    async add(req, res) {
        try {
            const {name, email, password, image} = req.body;

            const Encrypt = {
                cryptPassword: (password) =>
                    bcrypt.genSalt(10)
                    .then((salt => bcrypt.hash(password, salt)))
                    .then(hash => hash),
                } 
             
            const myEncryptPassword = await Encrypt.cryptPassword(password);
    
            await User.create({
              name,
              email,
              password: myEncryptPassword, 
              image
            });
            res.send("success");
        } catch (e) {
            console.log(e);
        }

    }

    async unic(req, res) {
        const id = req.params.id;
        const user = await User.findOne({where: {id: id}});
        res.send(user);
    }

    async alter(req,res) {
        const id = req.params.id;
        const user = await User.findOne({where: {id: id}});
        user.name = req.body.name;
        await user.save();
        res.send('updated');
    }

    async delete(req, res) {
        const id = req.params.id;
        await User.destroy({where: {id: id}});
        res.send('removed');
    }

  }

  module.exports = new mesa();