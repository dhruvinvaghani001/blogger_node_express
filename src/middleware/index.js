
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const isTokenValid = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

const authMiddleware = (req, res, next) => {
  const publicPath = ["/login", "/signup"];
  const path = req.path;
  const token = req.cookies.token;

  const checkTokne = token && isTokenValid(token);

  if (publicPath.includes(path) && checkTokne) {
    return res.redirect("/");
  } else if (!publicPath.includes(path) && !checkTokne) {
    return res.redirect("/login");
  }
  next();
};
export { authMiddleware };
