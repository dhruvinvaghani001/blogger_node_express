import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const getDatafromToken =  (req, res) => {
  try {
    const token = req.cookies.token;
    const userData =  jwt.verify(token, process.env.TOKEN_SECRET);
    return userData;
  } catch (error) {
    console.log("can't get data");
  }
};

export {getDatafromToken};