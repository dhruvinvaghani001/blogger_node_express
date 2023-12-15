import { Comment } from "../../models/comment.model.js";
import { Post } from "../../models/post.model.js";
import { getDatafromToken } from "../../utiils/getDatafromToken.js";

const createCommentController = async (req, res) => {
  const { post_id, comment } = req.body;
  const { id:user } = getDatafromToken(req);

  const newComment = await Comment.create({
    text: comment,
    user,
  });
  await newComment.save();

  // console.log(newComment);
  const post = await Post.findByIdAndUpdate(
    post_id,
    { $push: { comments: newComment._id } },
    { new: true }
  );

  res.redirect(`/post/${post_id}`);
};


const deleteCommetController = async(req,res)=>{
  const {id,post_id} = req.params;
  // console.log(id);
  try {
      const result = await Comment.deleteOne({_id:id});
  } catch (error) {
    console.log(error);
  }finally{
    res.redirect(`/post/${post_id}`)
  }
}

export { createCommentController,deleteCommetController };
