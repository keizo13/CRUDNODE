const User = require('../models/User');
const Encrypt = require('../utils/crypto.js');

  class Crud {

    async index(req, res) {
        const users = await User.findAll();
        res.send(users);
    };

    async add(req, res) {
        try {
            const {name, email, password, image} = req.body;      

            const myEncryptPassword = await Encrypt.cryptPassword(password);     
            await User.create({
              name,
              email,
              password: myEncryptPassword, 
              image
            });
            res.status(201).json("sucess");
        } catch (e) {
            res.sendStatus(e);
        }
    }

    async findoneuser(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.send(user);
    }

    async alter(req,res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        user.name = req.body.name;
        await user.save();
        res.sendStatus(204);
    }

    async delete(req, res) {
        const { id } = req.params;
        await User.destroy({where: {id}});
        res.sendStatus(204);
    }
  }

  module.exports = new Crud();