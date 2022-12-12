import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const createJWT = (data: String) => {
  let token = jwt.sign({ data }, `${process.env.JWT_KEY}`, { expiresIn: "1h" });
  return token;
};
