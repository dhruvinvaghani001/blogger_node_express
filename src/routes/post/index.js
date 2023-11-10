import express from "express";
import { createPostController } from "../../controllers/post/index.js";

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  res.render("post/index");
});

postRouter.get("/create", (req, res) => {
  res.render("post/newform");
});

postRouter.post("/create", createPostController);

export { postRouter };
