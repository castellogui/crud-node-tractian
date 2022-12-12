import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1]!;
    jwt.verify(token, `${process.env.JWT_KEY}`);
    next();
  } catch (error) {
    return res.status(401).send({ message: "An error has occurred while authentication verify." });
  }
};
