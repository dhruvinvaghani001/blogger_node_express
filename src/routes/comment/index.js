import express from "express";
import { createCommentController, deleteCommetController } from "../../controllers/comment/index.js";
import { authorization, authorizationComment } from "../../middleware/authorization.js";

const commentRouter = express.Router();

commentRouter.post("/comment", createCommentController);

commentRouter.post("/post/:post_id/comment/:id",authorizationComment,deleteCommetController);


export {commentRouter};