import { Post } from "../../models/post.model.js";
import { getDatafromToken } from "../../utiils/getDatafromToken.js";

const createPostController = async (req, res) => {
  const { title, content } = req.body;
  const imageurl = req.file.path;
  const user = getDatafromToken(req);
  const newpost = await Post.create({
    title,
    content,
    image: imageurl,
    author: user.id,
  });
  await newpost.save();
  res.redirect("/");
};

const getAllpostController = (req, res) => {
  try {
    
  } catch (error) {
    console.log("can't get posts");
  }
};

const updatePostController = (req, res) => {};

const deletePostController = (req, res) => {};

export {
  createPostController,
  getAllpostController,
  updatePostController,
  deletePostController,
};
