//token
const { verifyToken } = require("../utils/handleToken.js");
//clase error
const HttpError = require("../models/errorModel.js");

const authRequire = async (req, res, next) => {
  try {
    //valida cookie
    const { accessToken } = req.cookies;
    if (!accessToken)
      return next(new HttpError("Invalid credentials, no token", 422));
    // se valida token
    const user = await verifyToken(accessToken);
    if(!user) return next(new httpError("Invalid Credentials", 422));
    req.user = user;
    return next();
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = authRequire;
