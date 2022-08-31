const User = require('../models/User');
const Crypto = require('../utils/crypto.js');
const bcrypt = require('bcrypt');

class UserController {

  async index(req, res) {
    const users = await User.findAll();
    res.send(users);
  };

  async add(req, res) {
    try {
      const { name, email, password } = req.body;
      const myEncryptPassword = await Crypto.encryptPassword(password);
      const newUser = await User.create({
        name,
        email,
        password: myEncryptPassword
      });

      this.validate(newUser, "Não foi possível criar usuário.");
      res.status(201).json({ message: 'Sucesso!', name, email });
    } catch {
      res.status(400).send({ error: e.message });

    }
  }

  async findOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.getUser(id);
      res.send(user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  async alter(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const iduser = await User.findOne({where: {email}});
      const user = await this.getUser(id);
      await this.validatePassword(password, user.password);
      const updateUser = await User.update({
        name: name || user.name,
        email: email || user.email
      }, {
        where: {
          id
        }
      }
      );
      this.validate(updateUser[0], "usuario atualizado!");
      res.sendStatus(204);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.sendStatus(204);
  }

  async password(req, res) {
    try {
      const { id } = req.params;
      const { password, newPassword } = req.body;
      const myEncryptPassword = await Crypto.encryptPassword(newPassword);
      const user = await this.getUser(id);
      const errorMessage = "Senha incorreta!";
      await this.validatePassword(password, user.password, errorMessage);
      const updatePassword = await User.update({
        password: myEncryptPassword
      }, {
        where: {
          id
        }
      }
      );
      this.validate(updatePassword[0], "Não foi possível atualizar a senha");
      res.sendStatus(204);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
  async login(req, res) {

    try {
      const { email, password } = req.body; 
      const iduser = await User.findOne({where: {email}});
      const errorMessage = "Usuário ou senha inválidos";
      const user = await this.getUserByEmail(email, errorMessage);
      await this.validatePassword(password, user.password, errorMessage);
      res.status(200).send({ message: "sucesso", iduser});


    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  async validatePassword(password, passwordToCompare, errorMessage) {
    const isValidPassword = await Crypto.comparePasswords(password, passwordToCompare);
    this.validate(isValidPassword, errorMessage);
  }

  validate(data, errorMessage) {
    if (!data) {
      throw new Error(errorMessage);
    }
  }
  async getUserByEmail(email, errorMessage){
    const user = await User.findOne({where: {email}});
    this.validate(user, errorMessage);
    return user;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    this.validate(user, "Usuário não encontrado!");
    return user;
  }
}

module.exports = new UserController();