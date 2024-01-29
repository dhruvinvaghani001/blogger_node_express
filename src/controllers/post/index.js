import { Post } from "../../models/post.model.js";
import { Comment } from "../../models/comment.model.js";

import { getDatafromToken } from "../../utiils/getDatafromToken.js";
import { cloudinary } from "../../middleware/multer.js";

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
    const data = await Post.find().populate({
      path: "author",
      model: "User",
      select: "username",
    });
    // console.log((data[0].createdAt).);
    const dataComments = Post.aggregate([
      {
        $lookup: {
          from: "Comment",
          localField: "Comments",
          foreignField: "_id",
          as: "comments",
        },
      },
    ]);

    console.log(dataComments);

    

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
    const post = await Post.findById(id);
    const author = getDatafromToken(req);
    const { comments } = await post.populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
        select: "username",
      },
    });

    const commentsToPass = comments.map((iteam) => {
      return { ...iteam._doc, check: iteam.user._id == author.id };
    });
    // console.log(commentsToPass);

    if (post) {
      const check = post.author == author.id;
      res.render("post/post_detail", { post, comments: commentsToPass, check });
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

const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    const commets = post.comments;

    const imageUrl = post.image;
    console.log(imageUrl);
    try {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      const result = await cloudinary.api.delete_resources(
        ["uploads/" + publicId],
        {
          type: "upload",
          resource_type: "image",
        }
      );

      console.log(result);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    await Comment.deleteMany({ _id: { $in: commets } });
    await Post.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect("/");
  }
};

export {
  createPostController,
  getAllpostController,
  getPostController,
  updatePostController,
  deletePostController,
};
