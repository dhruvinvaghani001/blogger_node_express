import express from "express";
import { createPostController, getAllpostController } from "../../controllers/post/index.js";
import { upload } from "../../middleware/multer.js";

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  const data = getAllpostController();
  res.render("post/index",{data});
});

postRouter.get("/create", (req, res) => {
  res.render("post/newform");
});

postRouter.post("/create", upload.single('image') ,createPostController);

export { postRouter };
