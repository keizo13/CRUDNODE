const User = require('../models/User');
const crypte = require('../utils/crypto.js');

  class UserController {

    async index(req, res) {
        const users = await User.findAll();
        res.send(users);
    };

    async add(req, res) {
     
            const {name, email, password, image} = req.body;      
            const myEncryptPassword = await crypte.Encrypt.cryptPassword(password);
            const UserData = {name, email, password, image} ; 
            await User.create({
              name,
              email,
              password: myEncryptPassword, 
              image
            });
            res.status(201).json({ error: 'Sucesso!', UserData});
    }

    async findOneUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            await user.save();
            res.send(user);
        } catch(e) {
            res.send("Usuário não existe");
        }
    }

    async alter(req,res) {
        try { 
            const { id } = req.params;
            const user = await User.findByPk(id);
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.image = req.body.image;
            await user.save();
            res.sendStatus(204);            
    } catch(e) {
        res.send("Usuário não existe");
    }   
}

    async delete(req, res) {
        const { id } = req.params;
        await User.destroy({where: {id}});
        res.sendStatus(204);
    }
  }

  module.exports = new UserController();