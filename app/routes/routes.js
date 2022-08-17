const express = require("express");
const router = express.Router();
const Validacoes = require('../validations/validations.js');
const Crud = require('../controllers/Usercontroller.js');
const { intercept } = require('../utils/interception');

router.post(
  '/users', 
  Validacoes.add(),
  intercept,
  Crud.add.bind(Crud)
);

router.get(
  '/users',
  Crud.index
);
  
router.get(
  '/users/:id',
  Validacoes.findoneuser(),
  intercept, 
  Crud.findoneuser

);
  
router.put(
  '/users/:id',
  Validacoes.alter(),
  intercept,
  Crud.alter
);
  
router.delete(
  '/users/:id',
  Validacoes.delete(),
  intercept,
  Crud.delete
);

module.exports = router;