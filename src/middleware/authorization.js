import { Post } from "../models/post.model.js";
import { getDatafromToken } from "../utiils/getDatafromToken.js";

const authorization = async(req, res, next) => {
  const author = getDatafromToken(req);
  const { id } = req.params;
  const post = await Post.findOne({_id:id});
  console.log(post.author == author.id);
  if (post.author == author.id) {
    next();
  } else {
    res.redirect("/");
  }
};

export { authorization };
