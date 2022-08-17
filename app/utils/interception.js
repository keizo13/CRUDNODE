const { validationResult } = require("express-validator");
const validations = {};
const messages = require('../utils/messagens');

validations.intercept = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let instructions = [];
    errors.array().forEach((item) => {
      if (item.msg === "required") {
        instructions.push(messages.s001(item.param));
      } else if (item.msg === "email") {
        instructions.push(messages.s001(item.param));
      } else if (item.msg === "numeric") {
        instructions.push(messages.s001(item.param));
      } else if (item.msg === "empty") {
        instructions.push(messages.s001(item.param));
      } else if (item.msg === "empty") {
        instructions.push(messages.s001(item.param));
      } else {
        instructions.push(`${item.param} - ${item.msg}`);
      }
    });
    return res.status(400).json(messages.s001(instructions));
  } else {
    next();
  }
};

module.exports = validations;