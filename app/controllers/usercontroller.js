const User = require('../models/User');
const Crypto = require('../utils/crypto.js');

  class UserController {

    async index(req, res) {
        const users = await User.findAll();
        res.send(users);
    };

    async add(req, res) {
     
            const {name, email, password, image} = req.body;      
            const myEncryptPassword = await Crypto.encryptPassword(password);
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
            if (!user) {
                throw new Error("Usuário não existe");
            }            
            res.send(user);
        } catch(e) {
            res.status(404).send({ error: e.message });
        }
    }

    async alter(req,res) {
        try { 
            const { id } = req.params;
            const { name, email, password, image } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("Usuário não existe");
            }
            const isValidPassword = await Crypto.comparePasswords(password, user.password);
            if (!isValidPassword) {
                throw new Error("Senha incorreta");
            }
            // Todo verificar se a senha está correta
            await User.update({
                name: name || user.name,
                email: email || user.email,                
                image: image || user.image
            }, {
                where: {
                    id
                }
            });                  
            res.sendStatus(204);            
    } catch(e) {        
        res.status(400).send({error: e.message});
    }   
}

    async delete(req, res) {
        const { id } = req.params;
        await User.destroy({where: {id}});
        res.sendStatus(204);
    }
  }

  module.exports = new UserController();