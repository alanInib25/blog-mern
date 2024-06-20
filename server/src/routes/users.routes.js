const { Router } = require("express");
const usersRoutes = Router();
//middleware
const authRequire = require("../middlewares/JWTMiddleware.js");
//controllers
const {
  signupUser,
  signinUser,
  updateAvatar,
  updateUser,
  getAuthors,
  verifyUser,
} = require("../controllers/usersControllers.js");

usersRoutes.get("/", getAuthors);
usersRoutes.get("/verify", authRequire, verifyUser)
usersRoutes.post("/signup", signupUser);
usersRoutes.post("/signin", signinUser);
usersRoutes.post("/update-avatar", authRequire, updateAvatar);
usersRoutes.patch("/update-user", authRequire, updateUser);

module.exports = usersRoutes;
