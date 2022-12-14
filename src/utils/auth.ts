import jwt from "jsonwebtoken";
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

export const createJWT = (data: String) => {
  let token = jwt.sign({ data }, `${process.env.JWT_KEY}`, { expiresIn: "1h" });
  return token;
};
