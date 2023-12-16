import { User } from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body.email && req.body.password);
  if (!req.body.email && !req.body.password) {
    return res.render("auth/login", {
      message1: "please provide email",
      message2: "please provide password",
      status: false,
    });
  } else if (!req.body.password) {
    return res.render("auth/login", {
      message1: "",
      message2: "please provide password",
      status: false,
    });
  } else if (!req.body.email) {
    return res.render("auth/login", {
      message1: "please provide email",
      message2: "",
      status: false,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.render("auth/login", {
      message1: "User not exists",
      message2: "",
      status: false,
    });
  }
  const checkPass = await bcryptjs.compareSync(password, user.password);
  // console.log(checkPass);
  if (!checkPass) {
    res.render("auth/login", {
      message1: "",
      message2: "Password is not correct",
    });
  } else {
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.redirect("/");
  }
};

export { loginController };
