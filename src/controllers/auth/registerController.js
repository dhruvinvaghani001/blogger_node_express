import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const usernameAlredy = await User.find({ username });
  const emailalredy = await User.find({ email });

  if (usernameAlredy.length > 0 && emailalredy.length > 0) {
    res.render("auth/register", {
      message1: "username alredy exists",
      message2: "email alredy in use",
    });
  }

  if (usernameAlredy.length > 0) {
    res.render("auth/register", { message1: "Username should be unique ! please enter another name",message2:"" });
  } else if (emailalredy.length > 0) {
    res.render("auth/register", { message2: "Email alredy in use ! please use anoother email",message1:"" });
  } else {
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    console.log("hello");
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.redirect("/login");
  }
};

export { registerController };
