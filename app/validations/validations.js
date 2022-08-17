const router = require('express').Router();
const Crud = require('../models/User.js');
const { body, query, param } = require('express-validator');

class Validacoes {
    add() {
        return [
            body(['name', 'email', 'password', 'image'], 'Campo obrigatório').notEmpty(),
        ];
    }
    findoneuser() {
        return [
            param(['id'], 'Campo obrigatório').notEmpty()
        ];
    }

    alter() {
        return [
            body(['name', 'email', 'password', 'image'], 'Campo obrigatório').isString()
        ];
    }
    delete() {
        return [
            param(['id'], 'Campo obrigatório').notEmpty()
        ];
    }
}
module.exports = new Validacoes();