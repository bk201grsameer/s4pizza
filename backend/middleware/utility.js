const jwt = require("jsonwebtoken");

module.exports.funcReturn = (status, message) => {
  return { status, message };
};

module.exports.generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRET);
  } catch (error) {
    return error.message;
  }
};
