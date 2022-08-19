const router = require('express').Router();
const User = require('../models/User.js');
const { body, query, param } = require('express-validator');
const { min } = require('../models/User.js');

class Validacoes {

    add() {
        return [
            body(['name', 'email', 'password', 'image'], 'Campo obrigatório').notEmpty(),
            body('email').isEmail().withMessage("O E-mail está em formato incorreto!"),
            body('password').isLength({min: 6}).withMessage("A senha precisa ter no mínimo 6 caracteres!")
        ];
    }

    findOneUser() {
        return [
            param(['id'], 'Campo obrigatório').notEmpty()
        ];
    }

    alter() {
        return [
            body(['name', 'email', 'password', 'image'], 'Campo obrigatório').isString(),
            body('email').isEmail().withMessage("O E-mail está em formato incorreto!")
        ];
    }

    delete() {
        return [
            param(['id'], 'Campo obrigatório').notEmpty()
        ];
    }
    
    changePassword() {
        return [
            body(['password', 'newPassword'], 'Campo obrigatório').notEmpty()
        ];
    }
}

module.exports = new Validacoes();