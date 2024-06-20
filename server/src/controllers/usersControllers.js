//models
const User = require("../models/userModel.js");
//HttpError Class
const HttpError = require("../models/errorModel.js");
//fs
const { unlink } = require("fs");
//path
const path = require("path");
//uidd
const { v4: uuid } = require("uuid");
//handlePassword
const {
  hashPassword,
  comparePassword,
} = require("../utils/handleHashPassword.js");
//handle token
const { signToken, verifyToken } = require("../utils/handleToken.js");

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const isEmail = await User.findOne({ email: email });
    //email duplicado
    if (isEmail) return next(new HttpError("Email exists.", 422));
    //password difgerentes
    if (password !== confirmPassword)
      return next(new HttpError("Password not equals", 422));
    //hash password
    const hashedPass = await hashPassword(password);
    //user
    const newUser = await new User({
      name,
      email,
      password: hashedPass,
    }).save();

    return res.status(201).json(`User ${newUser.email} registered`);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validacion de email
    const user = await User.findOne({ email });
    if (!user) return next(new HttpError("Email invalid", 422));
    //validacion de password
    const checkPass =
      user === null ? false : await comparePassword(password, user.password);
    if (!checkPass) return next(new HttpError("Password invalid", 422));
    //token
    const { _id: id, name } = user;
    const accessToken = await signToken({
      payload: { id, name },
      expired: "30m",
    });
    res.cookie("accessToken", accessToken, { maxAge: 60000 * 30 });
    user.set("password", undefined);
    return res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) return next(new HttpError("Select Image", 422));
    //usuario
    const user = await User.findById(req.user.id);
    //borra avatar anterior
    if (user.avatar) {
      unlink(path.join(__dirname, "..", "uploads", user.avatar), (error) => {
        if (error) return next(new HttpError(error));
      });
    }
    //obtiene nuevo avatar
    const { avatar } = req.files;
    //valida el tamaño del nuevo avatar
    if (avatar.size > 500000) {
      return next(
        new HttpError("File exceeds size. Upload file less than 500kb", 422)
      );
    }
    //update avatar
    const name = avatar.name.split(".");
    const fileName = name[0] + uuid() + "." + name[1];
    const uploadPath = path.join(__dirname, "..", "uploads", fileName);
    avatar.mv(uploadPath, async (error) => {
      if (error) return next(new HttpError(error));
      //change and save new avatar
      user.avatar = fileName;
      const updateAvatar = await user.save();
      updateAvatar.set("password", undefined);
      return res.status(200).json(updateAvatar);
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      name,
      email,
      password: currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;
    //valida usuario
    const user = await User.findById(id);
    if (!user) return next(new HttpError("User not found", 403));
    //email duplicado
    const isEmail = await User.findOne({ email: email });
    if (isEmail && isEmail._id != id)
      return next(new HttpError("Email exist", 422));
    //valida hashspassword
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) return next(new HttpError("Invalid password", 422));
    //valida passwords iguales
    if (newPassword !== confirmPassword)
      return next(
        new HttpError("New Password and Confirm Password are not equals", 422)
      );
    //genera hashPassword
    const hash = await hashPassword(newPassword);
    //edita user
    user.name = name;
    user.email = email;
    user.password = hash;
    //guarda user
    const updatedUser = await user.save();
    //envia respueta
    updatedUser.set("password", undefined);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    return res.status(200).json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const verifyUser = async (req, res, next) =>{
  try{
    const {id} = req.user;
    if(!id) return next(new HttpError("Invalid credentials", 422));
    const user = await User.findById(id);
    if(!user) return next(new HttpError("Not user", 422));
    return res.status(200).json(user);
  }catch(error){
    return next(new HttpError(error))
  }
}

module.exports = {
  signupUser,
  signinUser,
  updateAvatar,
  updateUser,
  getAuthors,
  verifyUser,
};
