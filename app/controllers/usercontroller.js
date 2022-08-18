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
            const UserData = await User.create({
              name,
              email,
              password: myEncryptPassword, 
              image
            });
            res.status(201).json({message: 'Sucesso!', name, email, image});
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
            const updateUser = await User.update({
                name: name || user.name,
                email: email || user.email,                
                image: image || user.image
            }, {
                where: {
                    id
                }
            }
            );
            if(!updateUser[0]) {
                throw new Error("Não foi possível atualizar o usuário!") 
            } 
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
    async password(req, res) {
        const { id } = req.params;
        const { password } = req.body;
        const myEncryptPassword = await Crypto.encryptPassword(password);
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuário não existe");
        }
        await User.update({
            password: myEncryptPassword || user.password 
        }, {
            where: {
                id
            }
        }
        );
        res.status(201).json({message: 'Senha alterada com sucesso!'}); 
    }
  }

  module.exports = new UserController();