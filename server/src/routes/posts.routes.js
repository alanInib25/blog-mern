const { Router } = require("express");
const postsRoutes = Router();
//middleware
const authRequire = require("../middlewares/JWTMiddleware.js");
//controlls
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  getCatPosts,
  getUserPost,
  deletePost,
} = require("../controllers/postsControllers.js");

postsRoutes.get("/", getPosts);
postsRoutes.get("/:id", getPost);
postsRoutes.get("/categories/:category", getCatPosts);
postsRoutes.get("/users/:id", getUserPost);
postsRoutes.post("/", authRequire, createPost);
postsRoutes.patch("/:id", authRequire, updatePost);
postsRoutes.delete("/:id", authRequire, deletePost);

module.exports = postsRoutes;
