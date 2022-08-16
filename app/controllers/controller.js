const User = require('../models/User');
const bcrypt = require('bcrypt');

// Mudar o nome do arquivo, para algo que tenha mais significado.
// Alterar o nome da classe para algo que tenha um significado mellhor. Nome de classe sempre começa com letra maiúscula.
  class mesa {

    async index(req, res) {
        const users = await User.findAll();
        res.send(users);
    };

    async add(req, res) {
        try {
            const {name, email, password, image} = req.body;

//            Separar o Encrypt para um arquivo na pasta Util.
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
//           Alterar o retorno para retornar o status 201, e retornar o usuário cadastrado no formato JSON.
            res.send("success");
        } catch (e) {
//            Quando ocorrer um erro, retornar ao usuário.
            console.log(e);
        }

    }

//     Nome do método sem sentido.
    async unic(req, res) {
//       Utilizar desestruturação.
        const id = req.params.id;
//       Verificar se não pode usar o método findByPK
        const user = await User.findOne({where: {id: id}});
        res.send(user);
    }

    async alter(req,res) {
      //       Utilizar desestruturação.
        const id = req.params.id;
        const user = await User.findOne({where: {id: id}});
        user.name = req.body.name;
        await user.save();
      //       Alterar o retorno para 204 e não retornar nada no body.
        res.send('updated');
    }

    async delete(req, res) {
      //       Utilizar desestruturação.
        const id = req.params.id;
        await User.destroy({where: {id: id}});
//       Alterar o retorno para 204 e não retornar nada no body.
        res.send('removed');
    }

  }

  module.exports = new mesa();
