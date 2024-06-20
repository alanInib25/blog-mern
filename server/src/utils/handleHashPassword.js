const { hash, compare } = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    return hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

const comparePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    return compare(password, hashPassword, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports = { hashPassword, comparePassword };
