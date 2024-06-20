const { sign, verify } = require("jsonwebtoken");
const { SECRET_TOKEN_KEY } = require("../utils/handleConfig.js");

const signToken = ({payload, expired}) => {
  return new Promise((resolve, reject) => {
    return sign(payload, SECRET_TOKEN_KEY, { expiresIn: expired }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    return verify(token, SECRET_TOKEN_KEY, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports = { signToken, verifyToken };
