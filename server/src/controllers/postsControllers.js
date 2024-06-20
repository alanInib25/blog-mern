//Model
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
//HttpError class
const HttpError = require("../models/errorModel");
//uuid
const { v4: uuid } = require("uuid");
//path
const path = require("path");
//fs
const { unlink } = require("node:fs/promises");
const { error } = require("console");

//crea post
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    const { thumbnail } = req.files;
    if (thumbnail > 2000000)
      return next(
        new HttpError("File exceeds size. Upload file less than 2mb.", 422)
      );
    //nombre para archivo
    const name = thumbnail.name.split(".");
    const fileName = name[0] + uuid() + "." + name[1];
    const filePath = path.join(__dirname, "..", "uploads", fileName);
    //path de archivo
    thumbnail.mv(filePath, async (error) => {
      if (error) return next(new HttpError(error));
      //crea post
      const post = await new Post({
        title,
        category,
        description,
        thumbnail: fileName,
        creator: req.user.id,
      }).save();
      //incrementa post en usuario
      const user = await User.findById({ _id: req.user.id });
      user.posts = user.posts + 1;
      await user.save();
      //response
      return res.status(200).json(post);
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};
//posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate({ path: "creator", select: "-password"}).sort({ createdAt: -1});
    return res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//get Post
const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    //id
    if (!id) return next(new HttpError("Post unavailable"));
    //post
    const post = await Post.findById(id).populate({ path: "creator", select: "-password"});
    if (!post) return next(new HttpError("Post not found", 404));
    return res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//update post
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;
    let postUpdated;
    //id
    if (!id) return next(new HttpError("Post unavailable"));
    //valida thumbnail
    if (!req.files) {
      postUpdated = await Post.findByIdAndUpdate(
        id,
        { title, category, description },
        { new: true }
      );
    } else {
      const { thumbnail } = req.files;
      //obtiene post
      const post = await Post.findById({ _id: id });
      //elimina thumbnail anterior
      await unlink(path.join(__dirname, "..", "uploads", post.thumbnail));
      //size thumbnail
      if (thumbnail.size > 2000000) {
        return next(
          new HttpError("File exceeds size. Upload file less than 2mb.", 422)
        );
      }
      //update thumbnail
      const name = thumbnail.name.split(".");
      const fileName = name[0] + uuid() + "." + name[1];
      //path thumbnail
      thumbnail.mv(path.join(__dirname, "..", "uploads", fileName), (error) => {
        if (error) return next(new HttpError(error));
      });
      //Edit thumbnail post
      postUpdated = await Post.findByIdAndUpdate(
        { _id: id },
        { title, category, description, thumbnail: fileName },
        { new: true }
      );
    }
    return res.status(200).json(postUpdated);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//post por categoria
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const postForCategory = await Post.find({ category }).populate({ path: "creator", select: "-password"}).sort({
      updateAt: -1,
    });
    console.log(postForCategory)
    return res.status(200).json(postForCategory);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//post de usuario
const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new HttpError("Post unavailable"));
    const postsUser = await Post.find({ creator: id }).populate({ path: "creator", select: "-password"}).sort({ createdAt: -1 });
    return res.status(200).json(postsUser);
  } catch (error) {
    return next(new HttpError(error));
  }
};
//elimina post
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new HttpError("Post unavailable"));
    const post = await Post.findById(id);

    if(post.creator != req.user.id) return next(new HttpError("Delete post fail", 422));
    //elimina thumbnail
    await unlink(path.join(__dirname, "..", "uploads", post.thumbnail));
    //elimina post
    await Post.findByIdAndDelete(id);
    //descuenta post de usuario
    const user = await User.findById(req.user.id);
    user.posts = user?.posts - 1
    await user.save();
    //response
    return res.status(200).json(`Post ${id} deleted successfull`);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  getCatPosts,
  getUserPost,
  deletePost,
};
