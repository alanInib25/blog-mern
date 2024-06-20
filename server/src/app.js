const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

//routes
const usersRoutes = require("./routes/users.routes.js");
const postsRoutes = require("./routes/posts.routes.js");

const {notFound, errorHandleMiddle} = require("./middlewares/errorMiddleware.js");

//middle
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

//static
app.use(upload());
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

//routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
//not found
app.use(notFound);
//error handle
app.use(errorHandleMiddle);

module.exports = app;