import express from "express";
import { createCommentController } from "../../controllers/comment/index.js";

const commentRouter = express.Router();

commentRouter.post("/comment", createCommentController);


export {commentRouter};