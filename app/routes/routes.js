const express = require("express");
const router = express.Router();

const mesa = require('../controllers/controller.js');

router.post(
  '/users', 
  mesa.add.bind(mesa)
);

router.get(
  '/users',
  mesa.index
);
  
router.get(
  '/users/:id', 
  mesa.unic
);
  
router.put(
  '/users/:id',
  mesa.alter
);
  
router.delete(
  '/users/:id',
  mesa.delete
);

module.exports = router;