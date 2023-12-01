import express from "express";
import {
  createPostController,
  getAllpostController,
  getPostController,
  updatePostController,
} from "../../controllers/post/index.js";
import { upload } from "../../middleware/multer.js";
import { authorization } from "../../middleware/authorization.js";
import { Post } from "../../models/post.model.js";

const postRouter = express.Router();

postRouter.get("/", getAllpostController);

postRouter.get("/create", (req, res) => {
  res.render("post/newform");
});

postRouter.post("/create", upload.single("image"), createPostController);

postRouter.get("/post/:id", getPostController);

postRouter.get("/post/:id/edit", authorization, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  res.render("post/edit_form", { post });
});

postRouter.post(
  "/post/:id/update",
  upload.single("image"),
  updatePostController
);

export { postRouter };
