import express from "express";
import authRouter from "./routes/auth/index.js";
import { authMiddleware } from "./middleware/index.js";
import cookieParser from "cookie-parser";
import { getDatafromToken } from "./utiils/getDatafromToken.js";
import {  postRouter } from "./routes/post/index.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware);

app.use("/", authRouter);
app.use("/", postRouter);



app.get("/getdata", (req, res) => {
  const data = getDatafromToken(req);
  console.log(data);
  res.send("done");
});

export { app };
