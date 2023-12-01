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

const getAllpostController = async (req, res) => {
  try {
    const data = await Post.find();
    if (data.length == 0) {
      res.render("post/index", {
        data: [{ type: "not data", message: "no posts available" }],
      });
    } else {
      res.render("post/index", { data });
    }
  } catch (error) {
    console.log("can't get posts", error);
    res.redirect("/");
  }
};

const getPostController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });
    if (post) {
      const author = getDatafromToken(req);
      const check = post.author == author.id;
      res.render("post/post_detail", { post, check });
    }
  } catch (error) {
    console.log("cant get post ", error);
    res.redirect("/");
  }
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (req.file) {
    const imageUrl = req.file.path;

    const updatePost = await Post.updateOne(
      { _id: id },
      { title, content, image: imageUrl }
    );

    res.redirect("/");
  } else {
    const updatePost = await Post.updateOne({ _id: id }, { title, content });
    res.redirect("/");
  }
};

const deletePostController = (req, res) => {};

export {
  createPostController,
  getAllpostController,
  getPostController,
  updatePostController,
  deletePostController,
};
