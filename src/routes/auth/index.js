import express from "express";
import { loginController } from "../../controllers/auth/loginController.js";
import { registerController } from "../../controllers/auth/registerController.js";
import { logoutController } from "../../controllers/auth/logoutController.js";

const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
  res.render("auth/register", { message1: "", message2: "", stauts: true });
});

authRouter.post("/signup", registerController);

authRouter.get("/login", (req, res) => {
  res.render("auth/login", { message1: "", message2: "", stauts: true });
});

authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
