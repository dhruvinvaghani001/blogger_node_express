import express from "express";
import authRouter from "./routes/auth/index.js";
import { authMiddleware } from "./middleware/index.js";
import cookieParser from "cookie-parser";
import { getDatafromToken } from "./utiils/getDatafromToken.js";
import { postRouter } from "./routes/post/index.js";
// import {v2 as cloudinary} from "cloudinary";
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { upload } from "./middleware/multer.js";
import { commentRouter } from "./routes/comment/index.js";
import { Post } from "./models/post.model.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static('public'))


app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", commentRouter);

app.get("/getall",async(req,res)=>{
  const post = await Post.findById("655463544338cc9d5232a4b8").populate('comments');
  console.log(post);
  res.send("dnbfjkdn");
})


app.get(
  "/post/:id/edit",
  (req, res, next) => {
    const { id } = req.params;
    const post = {
      id: "svdnbj",
      title: "ajnh",
      content: "lknvjsd",
      owner: "654cf148dad2196c9062f63",
    };
    x;
    const userdata = getDatafromToken(req);
    if (post.owner === userdata.id) {
      next();
    } else {
      res.redirect("/");
    }
  },
  (req, res) => {
    res.send("done");
  }
);

app.get("/demo", (req, res) => {
  res.render("demo");
});

app.post("/comment", (req, res) => {
  console.log(req.body);
  res.send("hello");
});

// app.get("/getdata", (req, res) => {
//   const data = getDatafromToken(req);
//   console.log(data);
//   res.send("done");
// });


app.post("commerts",(req,res)=>{
  res.send("hello");
})

export { app };
