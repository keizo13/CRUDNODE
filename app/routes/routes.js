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
  UserController.findOneUser

);
  
router.put(
  '/users/:id',
  Validacoes.alter(),
  Intercept.intercept,
  UserController.alter
);
  
router.delete(
  '/users/:id',
  Validacoes.delete(),
  Intercept.intercept,
  UserController.delete
);

module.exports = router;
