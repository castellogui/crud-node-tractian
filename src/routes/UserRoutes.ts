import { Request, Response } from "express";
import User from "../models/User";
const router = require("express").Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, familyName, username, email, password, avatar, created_at, company } = req.body;

  if (!req.body) {
    res.status(422).send({ msg: "Body request empty." });
  }

  const user = {
    name,
    familyName,
    username,
    email,
    password,
    avatar,
    created_at,
    company,
  };

  try {
    await User.create(user);
    res.status(201).send({ msg: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
