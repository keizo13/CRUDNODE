const express = require("express");
const router = express.Router();
const Validacoes = require('../validations/validations.js');
const UserController = require('../controllers/usercontroller.js');
const Intercept = require('../utils/interception');
const User = require("../models/User.js");

router.post(
  '/users', 
  Validacoes.add(),
  Intercept.intercept,
  UserController.add.bind(UserController)
);

router.get(
  '/users',
  UserController.index
);
  
router.get(
  '/users/:id',
  Validacoes.findOneUser(),
  Intercept.intercept, 
  UserController.findOneUser.bind(UserController)

);
  
router.put(
  '/users',
  Validacoes.alter(),
  Intercept.intercept,
  UserController.alter.bind(UserController)
);
  
router.delete(
  '/users/:id',
  Validacoes.delete(),
  Intercept.intercept,
  UserController.delete
);

router.put(
  '/users/password/:id',
  Validacoes.changePassword(),
  Intercept.intercept,
  UserController.password.bind(UserController)
);

router.post(
  '/login',
  Validacoes.login(),
  Intercept.intercept,
  UserController.login.bind(UserController)
);

module.exports = router;
